import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { CdkListbox, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import { Component, ElementRef, computed, forwardRef, input, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownOption {
  value: string;
  label: string;
}

/** Accessible dropdown built on Angular CDK (overlay + listbox). Works with reactive forms. */
@Component({
  selector: 'app-dropdown',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, CdkListbox, CdkOption],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Dropdown), multi: true }],
  template: `
    <button
      type="button"
      class="dd-trigger"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      #trigger
      aria-haspopup="listbox"
      [attr.aria-expanded]="open()"
      [disabled]="disabled()"
      (click)="toggle()"
      (keydown.arrowDown)="openMenu($event)"
    >
      <span>{{ selectedLabel() }}</span>
      <span class="dd-caret" aria-hidden="true">▾</span>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayMinWidth]="width()"
      (overlayOutsideClick)="onOutside($event)"
      (overlayKeydown)="onKeydown($event)"
      (attach)="focusList()"
      (detach)="open.set(false)"
    >
      <ul class="dd-panel" cdkListbox [attr.aria-label]="label()" [cdkListboxValue]="[value()]" (cdkListboxValueChange)="pick($event)">
        @for (o of options(); track o.value) {
          <li class="dd-option" [cdkOption]="o.value">{{ o.label }}</li>
        }
      </ul>
    </ng-template>
  `,
})
export class Dropdown implements ControlValueAccessor {
  readonly options = input.required<DropdownOption[]>();
  readonly label = input('Options');

  protected readonly open = signal(false);
  protected readonly value = signal('');
  protected readonly disabled = signal(false);
  protected readonly width = signal(0);
  protected readonly selectedLabel = computed(() => this.options().find((o) => o.value === this.value())?.label ?? '');

  protected readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  ];

  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly list = viewChild(CdkListbox, { read: ElementRef });

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected toggle(): void {
    if (this.open()) this.close();
    else this.openMenu();
  }

  protected openMenu(event?: Event): void {
    event?.preventDefault();
    if (this.disabled()) return;
    this.width.set(this.trigger().nativeElement.getBoundingClientRect().width);
    this.open.set(true);
  }

  protected focusList(): void {
    setTimeout(() => (this.list()?.nativeElement as HTMLElement | undefined)?.focus());
  }

  protected pick(event: ListboxValueChangeEvent<string>): void {
    const next = event.value[0];
    // clicking the selected option would clear a single-select listbox; keep the current value
    if (next !== undefined && next !== this.value()) {
      this.value.set(next);
      this.onChange(next);
    }
    this.close();
  }

  protected onOutside(event: MouseEvent): void {
    if (!this.trigger().nativeElement.contains(event.target as Node)) this.close();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.key === 'Tab') this.close();
  }

  private close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.onTouched();
    this.trigger().nativeElement.focus();
  }
}
