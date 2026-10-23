import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cursor',
  host: {
    '(document:mousemove)': 'move($event)',
    '(document:mouseover)': 'over($event)',
    '(document:mouseleave)': 'visible.set(false)',
  },
  template: `<div class="cursor" [class.on]="visible()" [style.transform]="transform()"></div>`,
})
export class Cursor {
  protected readonly visible = signal(false);
  protected readonly transform = signal('translate3d(-100px,-100px,0)');
  private scale = 1;
  private x = -100;
  private y = -100;
  private readonly fine = typeof matchMedia === 'function' && matchMedia('(pointer: fine)').matches;

  protected move(e: MouseEvent): void {
    if (!this.fine) return;
    this.x = e.clientX;
    this.y = e.clientY;
    this.visible.set(true);
    this.render();
  }

  protected over(e: MouseEvent): void {
    const hot = (e.target as HTMLElement | null)?.closest?.('a, button, summary, input, textarea, select');
    this.scale = hot ? 3.4 : 1;
    this.render();
  }

  private render(): void {
    this.transform.set(`translate3d(${this.x}px,${this.y}px,0) scale(${this.scale})`);
  }
}
