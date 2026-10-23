import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioService } from '../../core/portfolio.service';
import { Dropdown, DropdownOption } from '../../shared/dropdown';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-contact-page',
  imports: [PageHero, ReactiveFormsModule, Dropdown],
  template: `
    <app-page-hero title="Contact" subtitle="Tell me about your project. I usually reply within a day." />
    <section class="section">
      <div class="container two">
        <div class="prose">
          <h2 style="text-align: left">Let's talk</h2>
          <p>Fill in the form and your email app will open with the message ready to send.</p>
          <p><b>Email:</b> <a [href]="'mailto:' + data.email">{{ data.email }}</a></p>
          <p><b>Availability:</b> Open for freelance and full-time roles.</p>
        </div>

        <form class="form card" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>
            Name
            <input formControlName="name" autocomplete="name" />
            @if (invalid('name')) { <span class="err">Please enter your name.</span> }
          </label>
          <label>
            Email
            <input type="email" formControlName="email" autocomplete="email" />
            @if (invalid('email')) { <span class="err">Please enter a valid email.</span> }
          </label>
          <label>
            Project type
            <app-dropdown formControlName="type" label="Project type" [options]="types" />
          </label>
          <label>
            Message
            <textarea rows="5" formControlName="message"></textarea>
            @if (invalid('message')) { <span class="err">Please write at least 10 characters.</span> }
          </label>
          <button class="btn btn-primary" type="submit">Send message →</button>
          @if (sent()) {
            <div class="ok" role="status">Thanks! Your email app should open now.</div>
          }
        </form>
      </div>
    </section>
  `,
})
export class ContactPage {
  protected readonly data = inject(PortfolioService);
  private readonly fb = inject(FormBuilder);
  protected readonly sent = signal(false);

  protected readonly types: DropdownOption[] = ['Website', 'Web application', 'API', 'Something else'].map((t) => ({ value: t, label: t }));

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    type: ['Website'],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected invalid(control: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, type, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`${type} enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${this.data.email}?subject=${subject}&body=${body}`;
    this.sent.set(true);
    this.form.reset({ type: 'Website' });
  }
}
