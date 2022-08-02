import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconsService } from 'src/app/services/icons.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  isCollapsed = true;
  @Output() toggleSidebar = new EventEmitter<any>();

  @Input() activeUser: any = null;
  constructor(private _icon: IconsService) {
    this._icon.registerIcons(this.icons);
  }

  opensidebar() {
    this.toggleSidebar.emit(this.isCollapsed);
  }

  private get icons(): Array<string> {
    return ['burger-menu'];
  }
}
