import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/portfolio.service';
import { Cta } from '../../sections/contact';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, Cta],
  template: `
    @if (project(); as p) {
      <section class="page-hero">
        <div class="container">
          <div class="crumbs"><a routerLink="/">Home</a> / <a routerLink="/projects">Projects</a> / {{ p.title }}</div>
          <h1>{{ p.title }}</h1>
          <p>{{ p.summary }}</p>
        </div>
      </section>

      <section class="section">
        <div class="container detail-grid">
          <div>
            <div class="detail-thumb" [class]="'detail-thumb ' + p.thumb"></div>
            <h2 style="text-align: left">Overview</h2>
            <p class="prose" style="color: var(--mute); margin-bottom: 22px">{{ p.description }}</p>
            <h3 style="margin-bottom: 10px">Key features</h3>
            <ul class="ticks">
              @for (f of p.features; track f) {
                <li>{{ f }}</li>
              }
            </ul>
          </div>
          <dl class="card facts">
            <dt>Role</dt><dd>{{ p.role }}</dd>
            <dt>Year</dt><dd>{{ p.year }}</dd>
            <dt>Category</dt><dd>{{ p.category }}</dd>
            <dt>Stack</dt>
            <dd class="tags">
              @for (t of p.tags; track t) {
                <span>{{ t }}</span>
              }
            </dd>
            @if (p.link) {
              <a class="btn btn-primary" [href]="p.link" target="_blank" rel="noopener">Visit project →</a>
            }
            <a class="btn btn-ghost" routerLink="/projects">← All projects</a>
          </dl>
        </div>
      </section>
      <app-cta />
    } @else {
      <section class="notfound container">
        <div class="big">?</div>
        <h2>Project not found</h2>
        <a class="btn btn-primary" routerLink="/projects">Back to projects</a>
      </section>
    }
  `,
})
export class ProjectDetail {
  private readonly data = inject(PortfolioService);
  readonly slug = input<string>();
  protected readonly project = computed(() => this.data.projectBySlug(this.slug()));
}
