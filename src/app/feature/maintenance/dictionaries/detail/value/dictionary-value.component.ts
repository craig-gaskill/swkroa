import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {CgtConfirmationComponent, CgtConfirmationContext, CgtNotificationService} from '@cagst/ngx-components';

import {DictionaryValue} from '../../../../../core/dictionary/dictionary-value';
import {DictionaryService} from '../../../../../core/dictionary/dictionary-service';

@Component({
  selector: 'swkroa-dictionary-value',
  templateUrl: './dictionary-value.component.html',
  styleUrls: ['./dictionary-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryValueComponent {
  private readonly SOURCE = 'MAINTAIN_DICTIONARIES';

  private _dictionaryValue: DictionaryValue;

  public valueForm: FormGroup;

  @Input() public dictionaryMeaning: string;
  @Input() public editing = false;

  @Input() public get dictionaryValue(): DictionaryValue {
    return this._dictionaryValue;
  }

  public set dictionaryValue(value: DictionaryValue) {
    this._dictionaryValue = value;

    this.valueForm.reset({
      display: value ? value.display : undefined,
      meaning: value ? value.meaning : undefined
    });
  }

  @Output() public created = new EventEmitter<DictionaryValue>();
  @Output() public deleted = new EventEmitter<DictionaryValue>();
  @Output() public updated = new EventEmitter<DictionaryValue>();

  constructor(private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _dictionaryService: DictionaryService,
              private _notificationService: CgtNotificationService
  ) {
    this.valueForm = this._formBuilder.group({
      display: [undefined, [Validators.required]],
      meaning: [undefined, [Validators.required]]
    });
  }

  public onEdit(): void {
    this.editing = true;
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
      .subscribe(result => result === confirmDelete.acceptData ? this.performDelete() : undefined);
  }

  public onSave(): void {
    const formModel = this.valueForm.value;

    const dv: DictionaryValue = new DictionaryValue();
    dv.dictionaryValueId = this._dictionaryValue.dictionaryValueId;
    dv.display = formModel.display;
    dv.meaning = formModel.meaning;
    dv.active = this._dictionaryValue.active;
    dv.updateCount = this.dictionaryValue.updateCount;

    if (this._dictionaryValue.dictionaryValueId) {
      this._dictionaryService.updateDictionaryValue(this.dictionaryMeaning, dv, this.SOURCE)
        .subscribe(result => {
          if (result) {
            this.editing = false;
            this.dictionaryValue = result;
            this.updated.emit(result);
            this._notificationService.success(`${result.display} was updated successfully.`);
          }
        }, () => this._notificationService.failure(`Failed to update ${dv.display}.`));
    } else {
      this._dictionaryService.createDictionaryValue(this.dictionaryMeaning, dv, this.SOURCE)
        .subscribe(result => {
          if (result) {
            this.editing = false;
            this.dictionaryValue = result;
            this.created.emit(result);
            this._notificationService.success(`${result.display} was created successfully.`);
          }
        }, () => this._notificationService.failure(`Failed to create ${dv.display}.`));
    }
  }

  public onCancel(): void {
    this.editing = false;
    this.dictionaryValue = this._dictionaryValue;
  }

  private performDelete(): void {
    this._dictionaryService.deleteDictionaryValue(this.dictionaryMeaning, this._dictionaryValue, this.SOURCE)
      .subscribe(result => {
        if (result) {
          this.deleted.emit(this._dictionaryValue);
          this._notificationService.success(`${this._dictionaryValue.display} was deleted successfully.`);
        }
      });
  }
}
