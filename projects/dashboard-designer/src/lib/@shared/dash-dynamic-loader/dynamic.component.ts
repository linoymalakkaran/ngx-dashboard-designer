import {
  Component,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  StaticProvider,
  Type,
  ViewContainerRef
} from '@angular/core';
import {
  DashComponentInjector,
  DashComponentInjectorToken
} from './component-injector';

@Component({
  selector: 'dash-dynamic',
  template: '',
  providers: [
    { provide: DashComponentInjectorToken, useExisting: DynamicComponent }
  ]
})
export class DynamicComponent<C = any>
  implements OnChanges, DashComponentInjector
{
  private static UpdateOnInputs: (keyof DynamicComponent)[] = [
    'dashDynamicComponent',
    'dashDynamicInjector',
    'dashDynamicProviders',
    'dashDynamicContent'
  ];

  @Input()
  dashDynamicComponent?: Type<C> | null;
  @Input()
  dashDynamicInjector?: Injector | null;
  @Input()
  dashDynamicProviders?: StaticProvider[] | null;
  @Input()
  dashDynamicContent?: any[][] | null;

  @Output()
  dashDynamicCreated: EventEmitter<ComponentRef<C>> = new EventEmitter();

  componentRef: ComponentRef<C> | null = null;

  constructor(private vcr: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      DynamicComponent.UpdateOnInputs.some(input =>
        changes.hasOwnProperty(input)
      )
    ) {
      this.createDynamicComponent();
    }
  }

  createDynamicComponent() {
    this.vcr.clear();
    this.componentRef = null;

    if (this.dashDynamicComponent) {
      this.componentRef = this.vcr.createComponent(this.dashDynamicComponent, {
        index: 0,
        injector: this._resolveInjector(),
        projectableNodes: this.dashDynamicContent
      });
      this.dashDynamicCreated.emit(this.componentRef);
    }
  }

  private _resolveInjector(): Injector {
    let injector = this.dashDynamicInjector || this.vcr.injector;

    if (this.dashDynamicProviders) {
      injector = Injector.create({
        providers: this.dashDynamicProviders,
        parent: injector
      });
    }

    return injector;
  }
}
