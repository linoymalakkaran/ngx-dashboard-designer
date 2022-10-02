import { Component, Input, OnInit, TemplateRef } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DashboardIconService } from '../../services/dashboard-icon.service';

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.scss']
})
export class TopBlockComponent implements OnInit {
  @Input() layout: any;
  modalRef?: BsModalRef;
  // form: FormGroup;

  constructor(
    private modalService: BsModalService,
    private _iconsService: DashboardIconService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   layoutname: new FormControl(),
    //   layoutid: new FormControl()
    // });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'DashboardDesignerModals' })
    );
  }

  saveLayout(): void {}

  private get icons(): Array<string> {
    return ['settings-icon'];
  }
}
