import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../core/portfolio.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <section class="hero" id="top">
      <div class="container">
        <div class="hero-meta">
          <span>Portfolio ’{{ yy }}</span>
          <span>Your time · {{ time() }} {{ zone }}</span>
          <span class="live">● Available for work</span>
        </div>

        <h1 class="mega">
          <span>Sabari</span>
          <span class="out">Praveen</span>
        </h1>

        <div class="hero-foot">
          <p class="lead">
            Full-stack developer. I design and build websites, web apps and APIs that are fast,
            accessible and easy to maintain.
          </p>
          <div class="actions">
            <a routerLink="/contact" class="btn btn-primary">Start a project →</a>
            <a routerLink="/projects" class="btn btn-ghost">Explore work</a>
          </div>
          <ul class="stats">
            @for (s of data.stats; track s.label) {
              <li><b>{{ s.value }}</b>{{ s.label }}</li>
            }
          </ul>
        </div>
      </div>

      <div class="marquee" aria-hidden="true">
        <div class="track">
          @for (n of [0, 1]; track n) {
            @for (w of words; track w) {
              <span>{{ w }}</span><i>✦</i>
            }
          }
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly data = inject(PortfolioService);
  protected readonly yy = String(new Date().getFullYear()).slice(2);
  protected readonly words = ['Angular', 'TypeScript', 'Node.js', 'REST APIs', 'Design systems', 'Performance', 'DevOps'];
  protected readonly zone = this.zoneName();
  protected readonly time = signal(this.now());

  constructor() {
    const id = setInterval(() => this.time.set(this.now()), 15_000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  private zoneName(): string {
    const part = new Intl.DateTimeFormat('en-GB', { timeZoneName: 'short' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName');
    return part?.value ?? '';
  }

  private now(): string {
    return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date());
  }
}
