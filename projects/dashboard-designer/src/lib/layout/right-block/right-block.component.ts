import { Component } from '@angular/core';
import { DashboardIconService } from '../../services/dashboard-icon.service';

@Component({
  selector: 'app-right-block',
  templateUrl: './right-block.component.html',
  styleUrls: ['./right-block.component.scss']
})
export class RightBlockComponent {
  constructor(private _iconsService: DashboardIconService) {
    this._iconsService.registerIcons(this.icons);
  }

  private get icons(): Array<string> {
    return ['down-chevron'];
  }
}
