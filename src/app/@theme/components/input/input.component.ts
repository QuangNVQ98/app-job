import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ft-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() type: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() holderText: string;

  @Output() onInputChange = new EventEmitter<any>();
  onfocus = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkValid(control, typeError): boolean {
    return this.formGroup.get(control).hasError(typeError) && (this.formGroup.get(control).touched || this.formGroup.get(control).dirty);
  }

  checkControlValid(control): boolean {
    return this.formGroup.get(control).invalid && (this.formGroup.get(control).touched || this.formGroup.get(control).dirty);
  }

  onChange() {
    this.onInputChange.emit();
  }

}
