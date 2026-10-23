import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Assistant } from './assistant/assistant';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Cursor } from './shared/cursor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Cursor, Assistant],
  template: `
    <app-header />
    <main><router-outlet /></main>
    <app-footer />
    <app-assistant />
    <app-cursor />
  `,
})
export class App {}
