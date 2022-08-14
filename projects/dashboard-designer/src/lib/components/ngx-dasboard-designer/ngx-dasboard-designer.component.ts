import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { CenterBlockComponent } from '../../layout';
import { IDashboardWidgetOption } from '../../models/dashboard-widget-options.model';
import { GridLayOutInstance } from '../../models/dashboard.models';
import { DashboardDesignerService } from '../../services/dashboard-designer.service';
import { DashboardIconService } from '../../services/dashboard-icon.service';
import { DashboardLayoutService } from '../../services/dashboard-layout.service';
import { TranslationService } from '../../services/translation.service';
import { DashResizeElementEvent } from '../dashboard-resizer/resize-element-event.interface';
import { DashResizeElementDirection } from '../dashboard-resizer/resize-element.enum';

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
  @Input() isSettings: boolean;
  @ViewChild(CenterBlockComponent, { static: false })
  centerBlockComponent: CenterBlockComponent;

  selectedWidget: any;
  addedLayout: any;

  public readonly layoutDirection = DashResizeElementDirection;
  public layout: any = {
    left: { show: true, slideOut: false },
    right: { show: true, slideOut: false, isShowSettings: true },
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
    private translationService: TranslationService,
    private _iconsService: DashboardIconService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.registerIcons();
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
    if (!this.isSettings) {
      this.layout.right.show = false;
      this.layout.right.isShowSettings = false;
    }
  }

  registerIcons(): void {
    const icons = [];
    this.widgetOptions.mfeWidgetTypes.forEach(type => {
      icons.push(type.icon);
    });
    this._iconsService.registerIcons(icons);
  }

  get getDashboardData(): GridLayOutInstance {
    return this.dashboardDesignerService.dashboardData;
  }

  public onResize(evt: DashResizeElementEvent, _block: any): void {
    this.layout[_block].width = evt.currentWidthValue;
    this.layout[_block].height = evt.currentHeightValue;
    this.layout[_block].top = evt.currentTopValue;
    this.layout[_block].left = evt.currentLeftValue;
  }

  public resizeEnd(evt: DashResizeElementEvent, _block: any): void {
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

  private get icons(): Array<string> {
    return ['menu-ico'];
  }

  ngOnDestroy(): void {
    this.layout.resizeFn$.complete();
  }
}
