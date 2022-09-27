import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  IDashboardWidgetOption,
  MfeWidgetType
} from '../../models/dashboard-widget-options.model';
import { DashboardDesignerService } from '../../services/dashboard-designer.service';
import { DashboardIconService } from '../../services/dashboard-icon.service';

@Component({
  selector: 'app-left-block',
  templateUrl: './left-block.component.html',
  styleUrls: ['./left-block.component.scss']
})
export class LeftBlockComponent implements OnInit {
  @Input() widgetOptions: IDashboardWidgetOption;
  isEditMode: boolean;

  @Output() onCreateNewLayoutClick: EventEmitter<any> = new EventEmitter<any>();

  layoutList: any = [];
  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private ref: ChangeDetectorRef,
    private _iconsService: DashboardIconService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    for (let i = 1; i <= 21; i++) {
      this.layoutList.push('layout' + i);
    }
  }

  createNewLayout(e) {
    this.isEditMode = false;
    this.onCreateNewLayoutClick.emit(e?.target?.id);
  }

  createNewDynamicLayout(e) {
    this.isEditMode = false;
    this.onCreateNewLayoutClick.emit('new');
  }

  loadDashboard(item): void {
    this.isEditMode = true;
    setTimeout(() => {
      this.dashboardDesignerService.emitSelectedLayoutEvent(item);
    }, 1000);
  }

  drop(event: CdkDragDrop<MfeWidgetType[]>) {
    // copyArrayItem(
    //   event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex
    // );
    // transferArrayItem(
    //   event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex
    // );
  }

  toggleWidgetDragMode(val): void {
    this.dashboardDesignerService.isWidgetDragModeEnabled$.next(val);
  }

  private get icons(): Array<string> {
    return [
      'layout-svg-ico',
      'widget-layout-ico',
      'bar-chart',
      'down-chevron',
      'plus-icon'
    ];
  }
}
