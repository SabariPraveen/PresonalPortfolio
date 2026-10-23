import { TestBed } from '@angular/core/testing';
import { AssistantService } from './assistant.service';

describe('AssistantService', () => {
  let bot: AssistantService;

  beforeEach(() => {
    bot = TestBed.inject(AssistantService);
  });

  it.each([
    ['What are your skills?', 'Skills:'],
    ['how much does a website cost', 'Pricing'],
    ['can I hire you for freelance', 'Open for new projects'],
    ['what is your email', 'contact form'],
    ['hello', 'Hello'],
  ])('answers "%s"', (question, expected) => {
    expect(bot.reply(question).text).toContain(expected);
  });

  it('knows a project by name and links to it', () => {
    const r = bot.reply('tell me about the analytics dashboard');
    expect(r.text).toContain('Analytics Dashboard');
    expect(r.links?.[0].path).toBe('/projects/analytics-dashboard');
  });

  it('falls back politely on unknown input', () => {
    expect(bot.reply('qwerty zxcvb').text).toContain("not sure");
    expect(bot.reply('   ').text).toContain("not sure");
  });
});
