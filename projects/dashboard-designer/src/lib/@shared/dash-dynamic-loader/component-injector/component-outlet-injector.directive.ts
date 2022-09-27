import { NgComponentOutlet } from '@angular/common';
import { ComponentRef, Directive, Host } from '@angular/core';

import { DashComponentInjector, DashComponentInjectorToken } from './token';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngComponentOutlet]',
  exportAs: 'ndcComponentOutletInjector',
  providers: [
    {
      provide: DashComponentInjectorToken,
      useExisting: ComponentOutletInjectorDirective
    }
  ]
})
export class ComponentOutletInjectorDirective implements DashComponentInjector {
  get componentRef(): ComponentRef<any> {
    // NOTE: Accessing private APIs of Angular
    return (this.componentOutlet as any)._componentRef;
  }

  constructor(@Host() private componentOutlet: NgComponentOutlet) {}
}
