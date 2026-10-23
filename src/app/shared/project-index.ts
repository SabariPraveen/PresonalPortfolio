import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../core/portfolio.models';

@Component({
  selector: 'app-project-index',
  imports: [RouterLink],
  template: `
    <div class="index" (mousemove)="move($event)" (mouseleave)="active.set(null)">
      @for (p of projects(); track p.slug; let i = $index) {
        <a class="row" [routerLink]="['/projects', p.slug]" (mouseenter)="active.set(p)" (focus)="active.set(p)">
          <span class="n">{{ pad(i + 1) }}</span>
          <span class="t">{{ p.title }}</span>
          <span class="m">{{ p.tags.join(' · ') }}</span>
          <span class="y">{{ p.year }} ↗</span>
        </a>
      } @empty {
        <p class="note">No projects in this category yet.</p>
      }
      @if (active(); as a) {
        <div class="peek" [class]="'peek ' + a.thumb" [style.left.px]="x() + 28" [style.top.px]="y() + 28" aria-hidden="true">
          <b>{{ a.category }}</b>
          <span>{{ a.summary }}</span>
        </div>
      }
    </div>
  `,
})
export class ProjectIndex {
  readonly projects = input.required<Project[]>();
  protected readonly active = signal<Project | null>(null);
  protected readonly x = signal(0);
  protected readonly y = signal(0);

  protected move(e: MouseEvent): void {
    this.x.set(e.clientX);
    this.y.set(e.clientY);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
