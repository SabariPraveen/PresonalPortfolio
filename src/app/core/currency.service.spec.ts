import { detect, formatPrice } from './currency.service';

describe('currency detection', () => {
  it.each([
    [['en-IN'], '', 'IN', 'INR'],
    [['en-GB', 'en'], '', 'GB', 'GBP'],
    [['fr-FR'], '', 'FR', 'EUR'],
    [['de-DE'], '', 'DE', 'EUR'],
    [['en-US'], '', 'US', 'USD'],
    [['en-AU'], '', 'AU', 'AUD'],
    [['ar-AE'], '', 'AE', 'AED'],
  ])('uses the language region: %j', (languages, tz, country, currency) => {
    expect(detect(languages, tz)).toEqual({ country, currency });
  });

  it('falls back to the time zone when the language has no region', () => {
    expect(detect(['en'], 'Asia/Kolkata')).toEqual({ country: 'IN', currency: 'INR' });
    expect(detect(['en'], 'Europe/London')).toEqual({ country: 'GB', currency: 'GBP' });
  });

  it('prefers the first language that has a region', () => {
    expect(detect(['en', 'en-IN'], 'America/New_York').country).toBe('IN');
  });

  it('defaults to USD when nothing is known', () => {
    expect(detect([], '')).toEqual({ country: '', currency: 'USD' });
    expect(detect(['en-ZZ'], 'Nowhere/Land').currency).toBe('USD');
  });
});

describe('formatPrice', () => {
  it('shows the right symbol and converts the USD base price', () => {
    expect(formatPrice(300, 'USD', 'en-US')).toBe('$300');
    expect(formatPrice(300, 'INR', 'en-IN')).toContain('₹');
    expect(formatPrice(300, 'GBP', 'en-GB')).toContain('£');
    expect(formatPrice(300, 'EUR', 'fr-FR')).toContain('€');
  });

  it('rounds to two significant figures', () => {
    // 300 USD * 88 = 26,400 INR -> 26,000
    expect(formatPrice(300, 'INR', 'en-IN').replace(/[^\d]/g, '')).toBe('26000');
    // 800 USD * 0.78 = 624 GBP -> 620
    expect(formatPrice(800, 'GBP', 'en-GB').replace(/[^\d]/g, '')).toBe('620');
  });
});
