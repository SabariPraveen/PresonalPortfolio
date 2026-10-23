import { Component, inject } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';

@Component({
  selector: 'app-testimonials',
  template: `
    <section class="section">
      <div class="container">
        <h2>Made for founders and teams alike</h2>
        <div class="grid g3">
          @for (r of data.reviews; track r.author) {
            <blockquote class="card">
              ★★★★★
              <p>“{{ r.text }}”</p>
              <cite>— {{ r.author }}</cite>
            </blockquote>
          }
        </div>
        <p class="note">Sample reviews for illustration.</p>
      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly data = inject(PortfolioService);
}
