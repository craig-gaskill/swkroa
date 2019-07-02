import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';
import {CgtConfirmationComponent, CgtConfirmationContext} from '@cagst/ngx-components';

@Component({
  selector: 'swkroa-dictionary-value',
  templateUrl: './dictionary-value.component.html',
  styleUrls: ['./dictionary-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryValueComponent {
  private _dictionaryValue: DictionaryValue;

  @Input() public editing = false;

  @Input() public get dictionaryValue(): DictionaryValue {
    return this._dictionaryValue;
  }

  public set dictionaryValue(value: DictionaryValue) {
    this._dictionaryValue = value;

    this.valueForm.reset({
      display: [value ? value.display : undefined],
      meaning: [value ? value.meaning : undefined]
    });
  }

  public valueForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _dialog: MatDialog
  ) {
    this.valueForm = this._formBuilder.group({
      display: [undefined, [Validators.required]],
      meaning: [undefined, [Validators.required]]
    });
  }

  public onEdit() {
    this.editing = true;
  }

  public onDelete() {
    const confirmDelete: CgtConfirmationContext = {
      title: 'Please Confirm',
      message: `Are you sure you want to delete <b>${this._dictionaryValue.display}</b>?`,
      acceptText: 'Confirm',
      acceptData: 'CONFIRMED',
      declineText: 'Cancel',
      declineData: 'CANCELED'
    };

    this._dialog.open(CgtConfirmationComponent, {data: confirmDelete})
      .afterClosed()
      .subscribe(result => result === confirmDelete.acceptData ? this.performDelete() : undefined);
  }

  public onSave() {
    this.editing = false;
  }

  public onCancel() {
    this.editing = false;
  }

  private performDelete() {
    console.log('DictionaryValueComponent::performDelete');
  }
}
