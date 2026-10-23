import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  imports: [RouterLink],
  template: `
    <section class="cta">
      <div class="container">
        <h2>Ready to build something with more clarity?</h2>
        <p>Tell me about your project and let's make it real.</p>
        <a class="btn btn-light" routerLink="/contact">Get in touch →</a>
      </div>
    </section>
  `,
})
export class Cta {}
