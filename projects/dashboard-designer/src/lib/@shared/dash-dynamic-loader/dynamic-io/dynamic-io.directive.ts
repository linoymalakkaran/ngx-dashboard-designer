import {
  Directive,
  DoCheck,
  Inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges
} from '@angular/core';

import {
  DashComponentInjector,
  DashComponentInjectorToken
} from '../component-injector';
import { InputsType, IoService, OutputsType } from '../io';

/* eslint-disable @angular-eslint/no-conflicting-lifecycle */

@Directive({
  selector:
    '[dashDynamicInputs],[dashDynamicOutputs],[ngComponentOutletDashDynamicInputs],[ngComponentOutletDashDynamicOutputs]',
  providers: [IoService]
})
export class DynamicIoDirective implements OnChanges, DoCheck {
  @Input()
  dashDynamicInputs: InputsType;
  @Input()
  ngComponentOutletDashDynamicInputs: InputsType;
  @Input()
  dashDynamicOutputs: OutputsType;
  @Input()
  ngComponentOutletDashDynamicOutputs: OutputsType;

  private get inputs() {
    return this.dashDynamicInputs || this.ngComponentOutletDashDynamicInputs;
  }

  private get outputs() {
    return this.dashDynamicOutputs || this.ngComponentOutletDashDynamicOutputs;
  }

  constructor(
    private ioService: IoService,
    @Inject(DashComponentInjectorToken)
    @Optional()
    private componentInjector?: DashComponentInjector
  ) {
    this.ioService.init(this.componentInjector);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ioService.update(
      this.inputs,
      this.outputs,
      this.inputsChanged(changes),
      this.outputsChanged(changes)
    );
  }

  ngDoCheck() {
    this.ioService.maybeUpdate();
  }

  private inputsChanged(changes: SimpleChanges): boolean {
    return (
      'ngComponentOutletDashDynamicInputs' in changes ||
      'dashDynamicInputs' in changes
    );
  }

  private outputsChanged(changes: SimpleChanges): boolean {
    return (
      'ngComponentOutletDashDynamicOutputs' in changes ||
      'dashDynamicOutputs' in changes
    );
  }
}
