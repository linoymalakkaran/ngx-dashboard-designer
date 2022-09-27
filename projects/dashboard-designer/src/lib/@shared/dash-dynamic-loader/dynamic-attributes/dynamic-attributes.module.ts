import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentOutletInjectorModule } from '../component-injector';
import { DashAttributesDirective } from './dynamic-attributes.directive';

@NgModule({
  imports: [CommonModule],
  exports: [DashAttributesDirective, ComponentOutletInjectorModule],
  declarations: [DashAttributesDirective]
})
export class DashAttributesModule {}
