import { Component } from '@angular/core';
import { Cta } from '../../sections/contact';
import { Faq } from '../../sections/faq';
import { Pricing } from '../../sections/pricing';
import { Services } from '../../sections/services';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-services-page',
  imports: [PageHero, Services, Pricing, Faq, Cta],
  template: `
    <app-page-hero title="Services" subtitle="What I can build for you, how engagements work and answers to common questions." />
    <app-services />
    <app-pricing />
    <app-faq />
    <app-cta />
  `,
})
export class ServicesPage {}
