import { Component, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../../core/portfolio.service';
import { PageHero } from '../../shared/page-hero';
import { ProjectIndex } from '../../shared/project-index';

@Component({
  selector: 'app-projects-page',
  imports: [PageHero, ProjectIndex],
  template: `
    <app-page-hero title="Projects" subtitle="A selection of things I have designed and built." />
    <section class="section">
      <div class="container">
        <div class="chips">
          @for (c of data.categories; track c) {
            <button type="button" class="chip" [class.on]="category() === c" (click)="category.set(c)">{{ c }}</button>
          }
        </div>
        <app-project-index [projects]="visible()" />
      </div>
    </section>
  `,
})
export class ProjectsPage {
  protected readonly data = inject(PortfolioService);
  protected readonly category = signal('All');
  protected readonly visible = computed(() =>
    this.data.projects.filter((p) => this.category() === 'All' || p.category === this.category()),
  );
}
