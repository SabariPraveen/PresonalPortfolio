import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/portfolio.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container foot-grid">
        <div>
          <a routerLink="/" class="logo">Sabari Praveen<span>.</span></a>
          <p>Developer building clear, reliable web products.</p>
        </div>
        <div>
          <h4>Explore</h4>
          @for (l of data.links; track l.path) {
            <a [routerLink]="l.path">{{ l.label }}</a>
          }
        </div>
        <div>
          <h4>Connect</h4>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a [href]="'mailto:' + data.email">Email</a>
        </div>
      </div>
      <p class="copy">© {{ year }} {{ data.name }}. All rights reserved.</p>
    </footer>
  `,
})
export class Footer {
  protected readonly data = inject(PortfolioService);
  protected readonly year = new Date().getFullYear();
}
