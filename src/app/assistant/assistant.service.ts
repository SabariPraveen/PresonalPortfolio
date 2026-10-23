import { Injectable, inject, signal } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';

export interface BotLink {
  label: string;
  path?: string;
}

export interface BotReply {
  text: string;
  links?: BotLink[];
}

export interface BotMessage extends BotReply {
  role: 'user' | 'bot';
}

interface Intent {
  keywords: string[];
  reply: () => BotReply;
}

export const SUGGESTIONS = ['What do you do?', 'Show projects', 'Pricing', 'Contact'];

/** Rule-based site guide: keyword matching over the portfolio data. No AI or network calls. */
@Injectable({ providedIn: 'root' })
export class AssistantService {
  private readonly data = inject(PortfolioService);

  readonly messages = signal<BotMessage[]>([
    {
      role: 'bot',
      text: 'Hi, I can answer questions about this portfolio and take you to the right page. Try a suggestion below.',
    },
  ]);
  readonly typing = signal(false);
  readonly busy = signal(false);

  private readonly intents: Intent[] = [
    {
      keywords: ['hello', 'hi', 'hey', 'vanakkam', 'good morning', 'good evening'],
      reply: () => ({ text: `Hello! I'm the guide for ${this.data.name}'s portfolio. Ask about skills, projects, services or how to get in touch.` }),
    },
    {
      keywords: ['who', 'about', 'yourself', 'what do you do', 'what you do', 'bio', 'background', 'introduce'],
      reply: () => ({
        text: `${this.data.name} is a full-stack developer working with Angular, TypeScript and Node.js. ${this.data.bio[0]}`,
        links: [{ label: 'Read more', path: '/about' }],
      }),
    },
    {
      keywords: ['skill', 'tech', 'stack', 'angular', 'node', 'typescript', 'frontend', 'backend', 'tools', 'know'],
      reply: () => ({
        text: 'Skills: ' + this.data.skills.map((s) => `${s.title} (${s.text.replace(/\.$/, '')})`).join('; ') + '.',
        links: [{ label: 'Skill levels', path: '/about' }],
      }),
    },
    {
      keywords: ['project', 'work', 'portfolio', 'built', 'case study', 'showcase', 'example'],
      reply: () => ({
        text: 'Selected projects: ' + this.data.projects.map((p) => p.title).join(', ') + '. Tell me a name for details.',
        links: [{ label: 'All projects', path: '/projects' }],
      }),
    },
    {
      keywords: ['service', 'offer', 'help with', 'build', 'website', 'web app', 'api', 'redesign', 'hire for'],
      reply: () => ({
        text: 'Services: ' + this.data.services.map((s) => s.title.toLowerCase()).join(', ') + '.',
        links: [{ label: 'See services', path: '/services' }],
      }),
    },
    {
      keywords: ['price', 'pricing', 'cost', 'rate', 'charge', 'quote', 'budget', 'how much', 'fee'],
      reply: () => ({
        text: 'Pricing depends on scope: ' + this.data.plans.map((p) => `${p.title.toLowerCase()} (${p.amount.toLowerCase()})`).join('; ') + '. Send details for a quote.',
        links: [{ label: 'Pricing & terms', path: '/services' }, { label: 'Ask for a quote', path: '/contact' }],
      }),
    },
    {
      keywords: ['time', 'long', 'deadline', 'timeline', 'duration', 'weeks', 'how fast', 'delivery'],
      reply: () => ({
        text: 'Landing pages take about a week, business websites 2-3 weeks, and web apps are planned in milestones.',
        links: [{ label: 'Start a project', path: '/contact' }],
      }),
    },
    {
      keywords: ['available', 'availability', 'freelance', 'hire', 'job', 'full-time', 'open to'],
      reply: () => ({
        text: 'Open for new projects. Send a message with your goals and you will usually hear back within a day.',
        links: [{ label: 'Hire me', path: '/contact' }],
      }),
    },
    {
      keywords: ['contact', 'email', 'mail', 'reach', 'phone', 'message', 'talk', 'connect', 'linkedin', 'github'],
      reply: () => ({
        text: `You can email ${this.data.email} or use the contact form.`,
        links: [{ label: 'Open contact form', path: '/contact' }],
      }),
    },
    {
      keywords: ['experience', 'education', 'career', 'years', 'resume', 'cv', 'timeline'],
      reply: () => ({
        text: this.data.experience.map((e) => `${e.period}: ${e.role}, ${e.org}`).join(' | '),
        links: [{ label: 'Full timeline', path: '/about' }],
      }),
    },
    {
      keywords: ['home', 'main page', 'start page', 'top'],
      reply: () => ({ text: 'Taking you home.', links: [{ label: 'Go home', path: '/' }] }),
    },
    {
      keywords: ['thanks', 'thank you', 'thx', 'nandri', 'bye'],
      reply: () => ({ text: "You're welcome! Reach out anytime.", links: [{ label: 'Contact', path: '/contact' }] }),
    },
  ];

  /** Pure matcher, kept separate so it can be tested without timers. */
  reply(input: string): BotReply {
    const text = input.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ').trim();
    if (!text) return this.fallback();

    const project = this.data.projects.find((p) => text.includes(p.title.toLowerCase()) || text.includes(p.slug.replace(/-/g, ' ')));
    if (project) {
      return {
        text: `${project.title} (${project.year}): ${project.description} Stack: ${project.tags.join(', ')}.`,
        links: [{ label: 'View project', path: `/projects/${project.slug}` }],
      };
    }

    const words = new Set(text.split(' '));
    let best: Intent | undefined;
    let bestScore = 0;
    for (const intent of this.intents) {
      let score = 0;
      for (const k of intent.keywords) {
        const hit = k.includes(' ') ? text.includes(k) : words.has(k) || (k.length >= 4 && [...words].some((w) => w.startsWith(k)));
        if (hit) score += k.includes(' ') ? 2 : 1;
      }
      if (score > bestScore) {
        best = intent;
        bestScore = score;
      }
    }
    return best ? best.reply() : this.fallback();
  }

  private fallback(): BotReply {
    return {
      text: "I'm not sure about that one. I can help with skills, projects, services, pricing or contact details, or you can write to the owner directly.",
      links: [{ label: 'Contact', path: '/contact' }, { label: 'Projects', path: '/projects' }],
    };
  }

  ask(input: string): void {
    const text = input.trim();
    if (!text || this.busy()) return;

    const answer = this.reply(text);
    this.messages.update((m) => [...m, { role: 'user', text }]);
    this.busy.set(true);
    this.typing.set(true);

    setTimeout(() => {
      this.typing.set(false);
      this.messages.update((m) => [...m, { role: 'bot', text: '' }]);
      this.type(answer);
    }, 450 + Math.random() * 450);
  }

  private type(answer: BotReply): void {
    let i = 0;
    const timer = setInterval(() => {
      i = Math.min(answer.text.length, i + 2);
      const done = i >= answer.text.length;
      this.messages.update((m) => [...m.slice(0, -1), { role: 'bot', text: answer.text.slice(0, i), links: done ? answer.links : undefined }]);
      if (done) {
        clearInterval(timer);
        this.busy.set(false);
      }
    }, 16);
  }
}
