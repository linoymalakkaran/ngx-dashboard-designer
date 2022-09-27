import { ComponentRef, InjectionToken } from '@angular/core';

export interface DashComponentInjector {
  componentRef: ComponentRef<any> | null;
}

export const DashComponentInjectorToken =
  new InjectionToken<DashComponentInjector>('DynamicComponentInjector');
