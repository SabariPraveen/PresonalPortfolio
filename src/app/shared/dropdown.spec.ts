import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownOption } from './dropdown';

@Component({
  imports: [Dropdown, ReactiveFormsModule],
  template: `<app-dropdown [formControl]="control" label="Project type" [options]="options" />`,
})
class Host {
  control = new FormControl('API', { nonNullable: true });
  options: DropdownOption[] = [
    { value: 'Website', label: 'Website' },
    { value: 'API', label: 'API' },
    { value: 'Other', label: 'Something else' },
  ];
}

describe('Dropdown', () => {
  let host: Host;
  let root: HTMLElement;
  let fixture: ReturnType<typeof TestBed.createComponent<Host>>;

  const trigger = () => root.querySelector('.dd-trigger') as HTMLButtonElement;
  const options = () => Array.from(document.body.querySelectorAll<HTMLElement>('.dd-option'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    fixture = TestBed.createComponent(Host);
    host = fixture.componentInstance;
    root = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('shows the label of the form value', () => {
    expect(trigger().textContent).toContain('API');
  });

  it('opens a listbox with every option', async () => {
    trigger().click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(options().map((o) => o.textContent?.trim())).toEqual(['Website', 'API', 'Something else']);
  });

  it('selects an option, updates the form control and closes', async () => {
    trigger().click();
    fixture.detectChanges();
    await fixture.whenStable();
    options()[2].click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.control.value).toBe('Other');
    expect(trigger().textContent).toContain('Something else');
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(options().length).toBe(0);
  });

  it('reflects programmatic value changes and the disabled state', () => {
    host.control.setValue('Website');
    fixture.detectChanges();
    expect(trigger().textContent).toContain('Website');
    host.control.disable();
    fixture.detectChanges();
    expect(trigger().disabled).toBe(true);
  });
});
