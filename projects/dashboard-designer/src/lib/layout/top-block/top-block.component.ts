import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.scss']
})
export class TopBlockComponent implements OnInit {
  @Input() layout: any;
  modalRef?: BsModalRef;
  title = 'Dashboard Designer';
  form: FormGroup;

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      layoutname: new FormControl('', [Validators.required]),
      layoutid: new FormControl('', [Validators.required])
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'DashboardDesignerModals' })
    );
  }
}
