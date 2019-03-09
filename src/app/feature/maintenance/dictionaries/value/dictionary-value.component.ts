import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';
import {AppConfigurationService} from '../../../../app-configuration.service';
import {Observable} from 'rxjs';
import {AppConfiguration} from '../../../../app-configuration.model';

@Component({
  selector: 'swkroa-dictionary-value',
  templateUrl: './dictionary-value.component.html',
  styleUrls: ['./dictionary-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryValueComponent implements OnInit {
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

  public configuration$: Observable<AppConfiguration>;
  public valueForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _appConfigService: AppConfigurationService
  ) {
    this.valueForm = this._formBuilder.group({
      display: [undefined, [Validators.required]],
      meaning: [undefined, [Validators.required]]
    });
  }

  public ngOnInit(): void {
    this.configuration$ = this._appConfigService.getAppConfiguration();
  }

  public onEdit() {
    this.editing = true;
  }

  public onDelete() {
  }

  public onSave() {
    this.editing = false;
  }

  public onCancel() {
    this.editing = false;
  }
}
