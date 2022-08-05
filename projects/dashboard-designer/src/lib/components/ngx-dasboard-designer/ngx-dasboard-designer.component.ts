import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { CenterBlockComponent } from '../../layout';
import {
  IDashboardWidgetOption,
  MfeWidgetType
} from '../../models/dashboard-widget-options.model';
import { GridLayOutInstance } from '../../models/dashboard.models';
import { DashboardDesignerService } from '../../services/dashboard-designer.service';
import { DashboardLayoutService } from '../../services/dashboard-layout.service';
import { TranslationService } from '../../services/translation.service';
import { AngularResizeElementEvent } from '../dashboard-resizer/angular-resize-element-event.interface';
import { AngularResizeElementDirection } from '../dashboard-resizer/angular-resize-element.enum';
import { DashboardWidgetDesignerComponent } from '../dashboard-widget-designer/dashboard-widget-designer.component';

@Component({
  selector: 'ngx-dasboard-designer',
  templateUrl: './ngx-dasboard-designer.component.html',
  styleUrls: ['./ngx-dasboard-designer.component.scss']
})
export class NgxDashboardDesigner implements OnInit, OnDestroy {
  editMode: boolean = false;
  @Input() widgetOptions: IDashboardWidgetOption;
  @Input() editLayoutJSON: any;
  @Input() isEditMode: boolean;
  @ViewChild(CenterBlockComponent, { static: false })
  centerBlockComponent: CenterBlockComponent;

  selectedWidget: any;
  addedLayout: any;

  public readonly layoutDirection = AngularResizeElementDirection;
  public layout: any = {
    left: { show: true, slideOut: false },
    right: { show: true, slideOut: false },
    top: { show: true, slideOut: false },
    bottom: { show: true, slideOut: false },
    center: { show: true, slideOut: false },
    resizeFn$: new Subject()
  };

  @ViewChild('leftBlock', { read: ElementRef })
  public readonly leftBlockEle: any;
  @Input() lang: 'en' | 'ar' = 'en';

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private dashboardLayoutService: DashboardLayoutService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.translationService.language = this.lang;
    this.layout.toggleLeft = () => {
      this.toggleLeft();
    };

    this.layout.toggleRight = () => {
      this.toggleRight();
    };

    if (this.editLayoutJSON) {
      this.dashboardDesignerService.emitSelectedLayoutEvent(
        this.editLayoutJSON
      );
    }
  }

  get getDashboardData(): GridLayOutInstance {
    return this.dashboardDesignerService.dashboardData;
  }

  public onResize(evt: AngularResizeElementEvent, _block: any): void {
    this.layout[_block].width = evt.currentWidthValue;
    this.layout[_block].height = evt.currentHeightValue;
    this.layout[_block].top = evt.currentTopValue;
    this.layout[_block].left = evt.currentLeftValue;
  }

  public resizeEnd(evt: AngularResizeElementEvent, _block: any): void {
    this.layout.resizeFn$.next();
  }

  toggleLeft(): void {
    this.layout.left.show = !this.layout.left.show;
    this.layout.resizeFn$.next();
  }

  toggleRight(): void {
    this.layout.right.show = !this.layout.right.show;
    this.layout.resizeFn$.next();
  }

  onCreateNewLayoutClick(layoutid) {
    let layoutJSON: GridLayOutInstance =
      this.dashboardLayoutService.getLayoutconfigByLayoutId(layoutid);
    this.dashboardDesignerService.emitSelectedLayoutEvent(layoutJSON);
  }

  ngOnDestroy(): void {
    this.layout.resizeFn$.complete();
  }
}
