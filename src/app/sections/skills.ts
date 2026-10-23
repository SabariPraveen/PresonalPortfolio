import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../core/portfolio.service';

@Component({
  selector: 'app-skills',
  imports: [RouterLink],
  template: `
    <section id="skills" class="section">
      <div class="container">
        <h2>Build across the stacks that matter</h2>
        <div class="grid g4">
          @for (c of data.skills; track c.title) {
            <article class="card">
              <h3>{{ c.title }}</h3>
              <p>{{ c.text }}</p>
              <a routerLink="/about">Learn more →</a>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly data = inject(PortfolioService);
}
