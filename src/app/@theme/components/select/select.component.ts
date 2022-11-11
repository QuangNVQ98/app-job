import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SelectItemModel} from './select-item.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ft-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() data: SelectItemModel[];
  @Input() holderText: string;

  @Output() changeValue = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  checkValid(control, typeError): boolean {
    return this.formGroup.get(control).hasError(typeError) && (this.formGroup.get(control).touched || this.formGroup.get(control).dirty);
  }

  checkControlValid(control): boolean {
    return this.formGroup.get(control).invalid && (this.formGroup.get(control).touched || this.formGroup.get(control).dirty);
  }

  onChangeValue(value): any {
    this.changeValue.emit(value);
  }

}
