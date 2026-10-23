import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="notfound container">
      <div class="big">404</div>
      <h2>Page not found</h2>
      <p class="note">The page you are looking for does not exist.</p>
      <a class="btn btn-primary" routerLink="/">Back home</a>
    </section>
  `,
})
export class NotFound {}
