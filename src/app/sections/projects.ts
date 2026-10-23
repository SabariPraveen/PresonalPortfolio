import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../core/portfolio.service';
import { ProjectIndex } from '../shared/project-index';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, ProjectIndex],
  template: `
    <section id="projects" class="section">
      <div class="container">
        <h2>Selected work</h2>
        <app-project-index [projects]="featured" />
        <div class="more"><a routerLink="/projects" class="btn btn-ghost">View all projects →</a></div>
      </div>
    </section>
  `,
})
export class Projects {
  private readonly data = inject(PortfolioService);
  protected readonly featured = this.data.projects.slice(0, 4);
}
