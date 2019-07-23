import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';

import {CgtConfirmationComponent, CgtConfirmationContext} from '@cagst/ngx-components';

import {DictionaryValue} from '../../../../../core/dictionary/dictionary-value';
import {DictionariesManager} from '../../dictionaries.manager';
import {ViewStatus} from '../../../../../app-store.state';

@Component({
  selector: 'swkroa-dictionary-value',
  templateUrl: './dictionary-value.component.html',
  styleUrls: ['./dictionary-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryValueComponent implements OnInit {
  public readonly VIEW_STATUS = ViewStatus;

  private _dictionaryValue: DictionaryValue;

  public formGroup: FormGroup;
  public viewStatus$: Observable<ViewStatus>;
  public editing = false;

  @Input() public dictionaryMeaning: string;

  @Input() public get dictionaryValue(): DictionaryValue {
    return this._dictionaryValue;
  }

  public set dictionaryValue(value: DictionaryValue) {
    this._dictionaryValue = value;

    this.formGroup.reset({
      display: value ? value.display : undefined,
      meaning: value ? value.meaning : undefined
    });
  }

  constructor(private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _dictionariesManager: DictionariesManager
  ) {
    this.formGroup = this._formBuilder.group({
      display: undefined,
      meaning: undefined
    });
  }

  public ngOnInit(): void {
    if (this._dictionaryValue && !this._dictionaryValue.dictionaryValueId) {
      // if it is a new Dictionary Values
      // place in edit mode so they can complete it
      this.editing = true;
    }

    this.viewStatus$ = this._dictionariesManager.getViewStatus();
  }

  public onEdit(): void {
    this.editing = true;
    this._dictionariesManager.editDictionaryValue(this.dictionaryMeaning, this._dictionaryValue);
  }

  public onDelete(): void {
    const confirmDelete: CgtConfirmationContext = {
      title: 'Please Confirm',
      message: `Are you sure you want to delete <b>${this._dictionaryValue.display}</b>?`,
      acceptText: 'Confirm',
      acceptData: 'CONFIRMED',
      declineText: 'Cancel',
      declineData: 'CANCELED'
    };

    this._dialog.open(CgtConfirmationComponent, {data: confirmDelete, autoFocus: false})
      .afterClosed()
      .subscribe(result =>
        result === confirmDelete.acceptData ?
          this._dictionariesManager.deleteDictionaryValue(this.dictionaryMeaning, this._dictionaryValue) :
          undefined
      );
  }

  public onSave(): void {
    const formModel = this.formGroup.value;

    const dv: DictionaryValue = new DictionaryValue();
    dv.dictionaryValueId = this._dictionaryValue.dictionaryValueId;
    dv.display = formModel.display;
    dv.meaning = formModel.meaning;
    dv.active = this._dictionaryValue.active;
    dv.updateCount = this.dictionaryValue.updateCount;

    this._dictionariesManager.saveDictionaryValue(this.dictionaryMeaning, dv);
  }

  public onCancel(): void {
    this.editing = false;
    this.dictionaryValue = this._dictionaryValue;
    this._dictionariesManager.cancelDictionaryValue(this.dictionaryMeaning, this._dictionaryValue);
  }
}
