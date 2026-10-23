import { Component } from '@angular/core';
import { Cta } from '../../sections/contact';
import { Hero } from '../../sections/hero';
import { Projects } from '../../sections/projects';
import { Skills } from '../../sections/skills';
import { Testimonials } from '../../sections/testimonials';

@Component({
  selector: 'app-home',
  imports: [Hero, Skills, Projects, Testimonials, Cta],
  template: `
    <app-hero />
    <app-skills />
    <app-projects />
    <app-testimonials />
    <app-cta />
  `,
})
export class Home {}
