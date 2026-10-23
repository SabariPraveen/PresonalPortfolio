import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/portfolio.service';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-hire',
  imports: [PageHero, RouterLink],
  template: `
    <app-page-hero title="Hire Me" subtitle="My bio-data at a glance: who I am, what I know and how to reach me." />

    <section class="section">
      <div class="container two">
        <div>
          <h2>Personal details</h2>
          <dl class="biodata">
            @for (d of data.details; track d.label) {
              <div>
                <dt>{{ d.label }}</dt>
                <dd>{{ d.value }}</dd>
              </div>
            }
            <div>
              <dt>Email</dt>
              <dd><a [href]="'mailto:' + data.email">{{ data.email }}</a></dd>
            </div>
          </dl>
        </div>

        <div class="prose">
          <h2>Profile</h2>
          @for (p of data.bio.slice(0, 2); track p) {
            <p>{{ p }}</p>
          }
          <h3 class="sub">Skills</h3>
          <div class="tags">
            @for (s of data.focusSkills; track s.name) {
              <span>{{ s.name }} · {{ s.level }}</span>
            }
          </div>
          <div class="actions">
            <a class="btn btn-primary" [href]="'mailto:' + data.email + '?subject=Hiring%20enquiry'">Email me →</a>
            <button type="button" class="btn btn-ghost" (click)="print()">Print / Save as PDF</button>
            <a class="btn btn-ghost" routerLink="/projects">See my work</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container narrow">
        <h2>Experience &amp; education</h2>
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
  `,
})
export class Hire {
  protected readonly data = inject(PortfolioService);

  protected print(): void {
    window.print();
  }
}
