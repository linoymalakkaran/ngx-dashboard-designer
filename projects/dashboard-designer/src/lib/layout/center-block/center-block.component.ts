import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-center-block',
  templateUrl: './center-block.component.html',
  styleUrls: ['./center-block.component.scss']
})
export class CenterBlockComponent implements OnInit {
  @Input() widgetOptions: any;
  @Input() editLayoutJSON: any;
  isEditMode: boolean;

  constructor() {}

  ngOnInit(): void {}
}
