import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';

describe('pages', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    });
    harness = await RouterTestingHarness.create();
  });

  const text = (): string => (harness.routeNativeElement as HTMLElement).textContent ?? '';

  it.each(['/', '/about', '/services', '/projects', '/contact', '/hire'])('renders %s', async (url) => {
    await harness.navigateByUrl(url);
    expect(text().length).toBeGreaterThan(50);
  });

  it('renders a project detail page', async () => {
    await harness.navigateByUrl('/projects/storefront');
    expect(text()).toContain('Online Storefront');
  });

  it('shows not-found for an unknown project', async () => {
    await harness.navigateByUrl('/projects/nope');
    expect(text()).toContain('Project not found');
  });

  it('shows 404 for an unknown route', async () => {
    await harness.navigateByUrl('/does-not-exist');
    expect(text()).toContain('404');
  });

  it('filters projects by category', async () => {
    await harness.navigateByUrl('/projects');
    const el = harness.routeNativeElement as HTMLElement;
    const before = el.querySelectorAll('app-project-index .row').length;
    (Array.from(el.querySelectorAll('.chip')).find((b) => b.textContent?.trim() === 'API') as HTMLElement).click();
    harness.detectChanges();
    expect(el.querySelectorAll('app-project-index .row').length).toBeLessThan(before);
  });

  it('validates the contact form', async () => {
    await harness.navigateByUrl('/contact');
    const el = harness.routeNativeElement as HTMLElement;
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    harness.detectChanges();
    expect(el.querySelectorAll('.err').length).toBe(3);
  });
});
