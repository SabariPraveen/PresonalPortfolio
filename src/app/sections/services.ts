import { Component, inject } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';

@Component({
  selector: 'app-services',
  template: `
    <section class="section alt">
      <div class="container">
        <h2>Everything you need to launch and grow</h2>
        <div class="grid g3">
          @for (c of data.services; track c.title) {
            <article class="card">
              <div class="ico">{{ c.icon }}</div>
              <h3>{{ c.title }}</h3>
              <p>{{ c.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly data = inject(PortfolioService);
}
