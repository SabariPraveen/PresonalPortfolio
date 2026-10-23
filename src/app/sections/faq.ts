import { Component, inject } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';

@Component({
  selector: 'app-faq',
  template: `
    <section id="faq" class="section alt">
      <div class="container narrow">
        <h2>Frequently asked questions</h2>
        @for (f of data.faqs; track f.q) {
          <details>
            <summary>{{ f.q }}</summary>
            <p>{{ f.a }}</p>
          </details>
        }
      </div>
    </section>
  `,
})
export class Faq {
  protected readonly data = inject(PortfolioService);
}
