import { Component, inject } from '@angular/core';
import { CurrencyService } from '../core/currency.service';
import { PortfolioService } from '../core/portfolio.service';

@Component({
  selector: 'app-pricing',
  template: `
    <section class="section">
      <div class="container">
        <h2>Clear terms, no surprises</h2>
        <div class="grid g3">
          @for (p of data.plans; track p.title) {
            <article class="card price" [class.featured]="p.featured">
              <h3>{{ p.title }}</h3>
              <div class="amt">{{ p.amount }}</div>
              <p>{{ p.text }}</p>
            </article>
          }
        </div>
        <p class="note">Prices shown in {{ money.currency }} (approximate). Final pricing varies with scope.</p>
      </div>
    </section>
  `,
})
export class Pricing {
  protected readonly data = inject(PortfolioService);
  protected readonly money = inject(CurrencyService);
}
