import { Injectable } from '@angular/core';

/**
 * Approximate units of currency per 1 USD. These are static placeholders, not live rates:
 * update them whenever you like, or replace `rate()` with a call to an exchange-rate API.
 */
export const RATES_PER_USD: Record<string, number> = {
  USD: 1,
  INR: 88,
  EUR: 0.92,
  GBP: 0.78,
  AED: 3.67,
  SAR: 3.75,
  AUD: 1.5,
  CAD: 1.37,
  NZD: 1.65,
  SGD: 1.3,
  MYR: 4.5,
  JPY: 150,
  CNY: 7.2,
  CHF: 0.88,
  BRL: 5.3,
  MXN: 18,
  ZAR: 18,
  LKR: 300,
};

const EURO_COUNTRIES = ['DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'GR', 'LU', 'SK', 'SI', 'EE', 'LV', 'LT', 'MT', 'CY', 'HR'];

const COUNTRY_CURRENCY: Record<string, string> = {
  US: 'USD', IN: 'INR', GB: 'GBP', AE: 'AED', SA: 'SAR', AU: 'AUD', CA: 'CAD', NZ: 'NZD',
  SG: 'SGD', MY: 'MYR', JP: 'JPY', CN: 'CNY', CH: 'CHF', BR: 'BRL', MX: 'MXN', ZA: 'ZAR', LK: 'LKR',
  ...Object.fromEntries(EURO_COUNTRIES.map((c) => [c, 'EUR'])),
};

/** Used only when the browser language has no region (for example plain "en"). */
const TIMEZONE_COUNTRY: Record<string, string> = {
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Colombo': 'LK',
  'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL', 'Europe/Zurich': 'CH',
  'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Singapore': 'SG', 'Asia/Kuala_Lumpur': 'MY',
  'Asia/Tokyo': 'JP', 'Asia/Shanghai': 'CN', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU',
  'Pacific/Auckland': 'NZ', 'America/Toronto': 'CA', 'America/Vancouver': 'CA',
  'America/Sao_Paulo': 'BR', 'America/Mexico_City': 'MX', 'Africa/Johannesburg': 'ZA',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US', 'America/Los_Angeles': 'US',
};

export interface Detected {
  country: string;
  currency: string;
}

/** Work out the visitor's country (from browser language, then time zone) and its currency. */
export function detect(languages: readonly string[], timeZone: string): Detected {
  let country = '';
  for (const tag of languages) {
    const region = tag.split('-')[1]?.toUpperCase();
    if (region && region.length === 2) {
      country = region;
      break;
    }
  }
  if (!country) country = TIMEZONE_COUNTRY[timeZone] ?? '';
  return { country, currency: COUNTRY_CURRENCY[country] ?? 'USD' };
}

/** Convert a USD base price, round it to two significant figures, and format it with the right symbol. */
export function formatPrice(usd: number, currency: string, locale?: string): string {
  const rate = RATES_PER_USD[currency] ?? 1;
  const converted = usd * rate;
  const step = Math.pow(10, Math.max(0, Math.floor(Math.log10(Math.max(converted, 1))) - 1));
  const rounded = Math.round(converted / step) * step;
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(rounded);
}

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  readonly locale: string | undefined = typeof navigator === 'undefined' ? undefined : navigator.language;
  readonly country: string;
  readonly currency: string;

  constructor() {
    const languages = typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language ?? ''];
    let timeZone = '';
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      /* time zone unavailable */
    }
    ({ country: this.country, currency: this.currency } = detect(languages, timeZone));
  }

  /** Format a USD base price in the visitor's currency, for example 300 -> "₹26,000". */
  format(usd: number): string {
    return formatPrice(usd, this.currency, this.locale);
  }
}
