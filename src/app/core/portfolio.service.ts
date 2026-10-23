import { Injectable, inject } from '@angular/core';
import { CurrencyService } from './currency.service';
import {
  Card,
  Experience,
  Faq,
  NavLink,
  Plan,
  Project,
  Review,
  Skill,
  SkillBar,
  Stat,
} from './portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly money = inject(CurrencyService);

  readonly name = 'Sabari Praveen';
  readonly email = 'ar.sabaripraveen@gmail.com';

  readonly links: NavLink[] = [
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  readonly stats: Stat[] = [
    { value: '2+', label: 'Years building' },
    { value: '10+', label: 'Projects shipped' },
    { value: '100%', label: 'Responsive' },
  ];

  readonly focusSkills: Skill[] = [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'Angular', level: 'Advanced' },
    { name: 'Node.js', level: 'Proficient' },
    { name: 'DotNet Core', level: 'Proficient' },
    { name: 'React', level: 'Advanced' },
  ];

  readonly bio: string[] = [
    'I am a software developer who enjoys turning ideas into fast, accessible and easy-to-maintain web products.',
    'I work across the stack, from interface design and Angular front ends to Node.js APIs and deployment, so projects stay consistent from start to finish.',
    'Replace this text with your own story, background and what you care about.',
  ];

  /** Bio-data shown on the Hire Me page. Replace the [bracketed] values with your own. */
  readonly details = [
    { label: 'Full name', value: 'Sabari Praveen' },
    { label: 'Role', value: 'Full-stack Developer' },
    { label: 'Experience', value: '2+ years' },
    { label: 'Location', value: '[Your city, country]' },
    { label: 'Phone', value: '[Add your phone number]' },
    { label: 'Availability', value: 'Open for freelance and full-time roles' },
    { label: 'Languages', value: '[Languages you speak]' },
    { label: 'Education', value: '[Degree, university, year]' },
  ];

  readonly skills: Card[] = [
    { title: 'Frontend', text: 'HTML, CSS, TypeScript, Angular and responsive UI.' },
    { title: 'Backend', text: 'Node.js, REST APIs, authentication and databases.' },
    { title: 'Cloud & DevOps', text: 'Git, CI/CD, Docker and cloud deployment.' },
    { title: 'UI / UX', text: 'Wireframes, design systems and prototypes.' },
  ];

  readonly skillBars: SkillBar[] = [
    { name: 'TypeScript / JavaScript', percent: 90 },
    { name: 'Angular', percent: 88 },
    { name: 'HTML & CSS', percent: 92 },
    { name: 'Node.js & APIs', percent: 78 },
    { name: 'Git & DevOps', percent: 72 },
  ];

  readonly experience: Experience[] = [
    { period: '2024 – Present', role: 'Full-stack Developer', org: 'Your Company', text: 'Building web apps and APIs, owning features from design to release.' },
    { period: '2023 – 2024', role: 'Frontend Developer', org: 'Previous Company', text: 'Delivered responsive Angular interfaces and improved page performance.' },
    { period: '2022', role: 'Education', org: 'Your University', text: 'Degree in Computer Science or related field.' },
  ];

  readonly services: Card[] = [
    { icon: '⌘', title: 'Business websites', text: 'Fast, SEO-ready sites that explain what you do.' },
    { icon: '◧', title: 'Web applications', text: 'Dashboards, portals and tools built to scale.' },
    { icon: '⇄', title: 'API development', text: 'Clean, documented backends and integrations.' },
    { icon: '✦', title: 'Redesigns', text: 'Modernise an existing product without starting over.' },
    { icon: '⚡', title: 'Performance', text: 'Audit and speed up slow pages and queries.' },
    { icon: '☺', title: 'Guided support', text: 'Clear communication and help after launch.' },
  ];

  readonly projects: Project[] = [
    {
      slug: 'storefront',
      title: 'Online Storefront',
      summary: 'E-commerce storefront with cart and payments.',
      description: 'A responsive shop with product search, a persistent cart and a secure checkout flow. Built for fast loads on mobile.',
      category: 'Web',
      tags: ['Angular', 'Node', 'Stripe'],
      thumb: 't1',
      year: '2025',
      role: 'Full-stack developer',
      features: ['Product search and filters', 'Persistent cart', 'Secure checkout', 'Admin product editor'],
    },
    {
      slug: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      summary: 'Dashboard with live charts and reports.',
      description: 'A data dashboard that turns raw events into clear charts, with date filters and CSV export for the team.',
      category: 'Web',
      tags: ['TypeScript', 'API', 'Charts'],
      thumb: 't2',
      year: '2025',
      role: 'Frontend developer',
      features: ['Live updating charts', 'Date range filters', 'CSV export', 'Role-based views'],
    },
    {
      slug: 'booking-app',
      title: 'Booking App',
      summary: 'Mobile-first booking app for local services.',
      description: 'An installable progressive web app where customers browse availability and book a slot in a few taps.',
      category: 'Mobile',
      tags: ['PWA', 'CSS', 'Angular'],
      thumb: 't3',
      year: '2024',
      role: 'Full-stack developer',
      features: ['Installable PWA', 'Real-time availability', 'Email confirmations', 'Offline-friendly'],
    },
    {
      slug: 'rest-api',
      title: 'Orders REST API',
      summary: 'Documented REST API for an order system.',
      description: 'A versioned REST API with authentication, validation and OpenAPI documentation used by web and mobile clients.',
      category: 'API',
      tags: ['Node', 'REST', 'JWT'],
      thumb: 't2',
      year: '2024',
      role: 'Backend developer',
      features: ['JWT authentication', 'Request validation', 'OpenAPI docs', 'Automated tests'],
    },
  ];

  readonly categories: string[] = ['All', 'Web', 'API'];

  /**
   * Base prices are in USD (placeholders: set your own). They are converted to the visitor's
   * currency and shown with its symbol, for example "From ₹26,000" in India.
   */
  private readonly basePlans = [
    { title: 'Landing page', usd: 300, text: '1 page, responsive, contact form. About 1 week.' },
    { title: 'Business website', usd: 800, text: 'Up to 6 pages, CMS-ready, SEO basics. 2–3 weeks.', featured: true },
    { title: 'Web application', usd: null, text: 'Scoped together, delivered in milestones.' },
  ];

  readonly plans: Plan[] = this.basePlans.map((p) => ({
    title: p.title,
    text: p.text,
    featured: p.featured,
    amount: p.usd === null ? 'Custom' : `From ${this.money.format(p.usd)}`,
  }));

  readonly reviews: Review[] = [
    { text: 'Delivered on time and communicated clearly throughout.', author: 'Client A' },
    { text: 'Our site is faster and far easier to manage now.', author: 'Client B' },
    { text: 'Great eye for detail and a pleasure to work with.', author: 'Client C' },
  ];

  readonly faqs: Faq[] = [
    { q: 'How do we get started?', a: 'Send a message with your goals. I reply within a day with questions and a rough plan.' },
    { q: 'How long does a project take?', a: 'Landing pages take about a week; larger builds are planned in milestones.' },
    { q: 'Do you offer support after launch?', a: 'Yes, with bug fixes and updates available as ongoing support.' },
    { q: 'Which technologies do you use?', a: 'Mostly TypeScript, Angular and Node.js, chosen to suit the project.' },
  ];

  projectBySlug(slug: string | undefined): Project | undefined {
    return this.projects.find((p) => p.slug === slug);
  }
}
