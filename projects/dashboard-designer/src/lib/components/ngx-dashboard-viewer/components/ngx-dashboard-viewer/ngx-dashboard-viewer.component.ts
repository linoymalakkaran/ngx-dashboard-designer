import { Component, Input, OnInit } from '@angular/core';
import { DirTypes } from 'angular-gridster2';
import { Subject } from 'rxjs';
import { IGridLayOutInstance } from '../../../../models/dashboard.models';
import { TranslationService } from '../../../../services/translation.service';

@Component({
  selector: 'ngx-dashboard-viewer',
  templateUrl: './ngx-dashboard-viewer.component.html',
  styleUrls: ['./ngx-dashboard-viewer.component.scss']
})
export class NgxDashboardViewerComponent implements OnInit {
  public layout: any = {
    left: { show: true, slideOut: false },
    right: { show: true, slideOut: false },
    top: { show: true, slideOut: false },
    bottom: { show: true, slideOut: false },
    center: { show: true, slideOut: false },
    resizeFn$: new Subject()
  };
  @Input() dashboardLayout: IGridLayOutInstance;
  @Input() lang: 'en' | 'ar' = 'en';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.language = this.lang;
    this.dashboardLayout.options.dirType =
      this.lang == 'ar' ? DirTypes.RTL : DirTypes.LTR;
  }

  ngOnDestroy(): void {
    this.layout.resizeFn$.complete();
  }
}
