import { AfterViewChecked, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssistantService, BotLink, SUGGESTIONS } from './assistant.service';

@Component({
  selector: 'app-assistant',
  imports: [FormsModule],
  styleUrl: './assistant.css',
  host: {
    '(document:keydown)': 'onKey($event)',
  },
  template: `
    @if (open()) {
      <section class="panel" role="dialog" aria-label="Site guide">
        <header>
          <div>
            <b>Site guide</b>
            <small>Instant answers · <kbd>Ctrl</kbd> <kbd>K</kbd></small>
          </div>
          <button type="button" class="x" aria-label="Close guide" (click)="open.set(false)">×</button>
        </header>

        <div class="log" #log aria-live="polite">
          @for (m of bot.messages(); track $index) {
            <div class="msg" [class.me]="m.role === 'user'">
              {{ m.text }}
              @if (m.links?.length) {
                <div class="links">
                  @for (l of m.links; track l.label) {
                    <button type="button" (click)="go(l)">{{ l.label }} →</button>
                  }
                </div>
              }
            </div>
          }
          @if (bot.typing()) {
            <div class="msg typing" aria-label="Typing"><i></i><i></i><i></i></div>
          }
        </div>

        <div class="chips">
          @for (s of suggestions; track s) {
            <button type="button" (click)="ask(s)" [disabled]="bot.busy()">{{ s }}</button>
          }
        </div>

        <form (ngSubmit)="submit()">
          <input
            #field
            name="q"
            [(ngModel)]="draft"
            placeholder="Ask about skills, projects, pricing…"
            autocomplete="off"
            maxlength="200"
          />
          <button type="submit" [disabled]="bot.busy() || !draft.trim()">Send</button>
        </form>
      </section>
    }
    <button type="button" class="fab" [attr.aria-label]="open() ? 'Close guide' : 'Open site guide'" (click)="toggle()">
      {{ open() ? '×' : 'Ask' }}
    </button>
  `,
})
export class Assistant implements AfterViewChecked {
  protected readonly bot = inject(AssistantService);
  private readonly router = inject(Router);
  protected readonly open = signal(false);
  protected readonly suggestions = SUGGESTIONS;
  protected draft = '';
  private readonly log = viewChild<ElementRef<HTMLElement>>('log');
  private readonly field = viewChild<ElementRef<HTMLInputElement>>('field');

  ngAfterViewChecked(): void {
    const el = this.log()?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  protected onKey(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.toggle();
    } else if (e.key === 'Escape' && this.open()) {
      this.open.set(false);
    }
  }

  protected toggle(): void {
    this.open.update((o) => !o);
    if (this.open()) setTimeout(() => this.field()?.nativeElement.focus());
  }

  protected submit(): void {
    const text = this.draft;
    this.draft = '';
    this.bot.ask(text);
  }

  protected ask(text: string): void {
    this.bot.ask(text);
  }

  protected go(link: BotLink): void {
    if (link.path) void this.router.navigateByUrl(link.path);
  }
}
