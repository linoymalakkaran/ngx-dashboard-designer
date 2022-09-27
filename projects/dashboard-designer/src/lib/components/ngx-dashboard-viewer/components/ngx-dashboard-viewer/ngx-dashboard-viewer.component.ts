import { Component, Input, OnInit } from '@angular/core';
import { DirTypes } from '../../../../@shared';
import { IGridLayOutInstance } from '../../../../models/dashboard.models';
import { TranslationService } from '../../../../services/translation.service';
import {
  defaultLayoutConfig,
  LayoutConfigModel
} from '../../../../models/dashboard-layout-config.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-dashboard-viewer',
  templateUrl: './ngx-dashboard-viewer.component.html',
  styleUrls: ['./ngx-dashboard-viewer.component.scss']
})
export class NgxDashboardViewerComponent implements OnInit {
  @Input() layoutConfig?: any = defaultLayoutConfig;
  layout: LayoutConfigModel;
  @Input() dashboardLayout: IGridLayOutInstance;
  @Input() lang: 'en' | 'ar' = 'en';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.layout = this.layoutConfig;
    this.layout.resizeFn$ = new Subject();
    this.translationService.language = this.lang;
    this.dashboardLayout.options.dirType =
      this.lang == 'ar' ? DirTypes.RTL : DirTypes.LTR;
  }

  ngOnDestroy(): void {
    this.layout.resizeFn$.complete();
  }
}
