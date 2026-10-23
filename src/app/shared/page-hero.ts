import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="crumbs"><a routerLink="/">Home</a> / {{ title() }}</div>
        <h1>{{ title() }}</h1>
        <p>{{ subtitle() }}</p>
      </div>
    </section>
  `,
})
export class PageHero {
  readonly title = input.required<string>();
  readonly subtitle = input('');
}
