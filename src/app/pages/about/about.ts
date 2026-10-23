import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/portfolio.service';
import { Cta } from '../../sections/contact';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-about',
  imports: [PageHero, Cta],
  template: `
    <app-page-hero title="About" subtitle="Who I am, what I do and how I like to work." />

    <section class="section">
      <div class="container two">
        <div class="prose">
          <h2 style="text-align: left">Hi, I'm {{ data.name }}</h2>
          @for (p of data.bio; track p) {
            <p>{{ p }}</p>
          }
        </div>
        <div class="skillbars">
          @for (s of data.skillBars; track s.name) {
            <div>
              <div class="row"><span>{{ s.name }}</span><span>{{ s.percent }}%</span></div>
              <div class="bar"><span [style.width.%]="s.percent"></span></div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container narrow">
        <h2>Experience & education</h2>
        <div class="timeline">
          @for (e of data.experience; track e.period) {
            <article>
              <time>{{ e.period }}</time>
              <h3>{{ e.role }} · {{ e.org }}</h3>
              <p>{{ e.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <app-cta />
  `,
})
export class About {
  protected readonly data = inject(PortfolioService);
}
