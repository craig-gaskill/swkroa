import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';
import {DictionariesManager} from '../dictionaries.manager';
import {Observable} from 'rxjs';

@Component({
  selector: 'swkroa-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryDetailComponent implements OnInit {
  public dictionaryValues$: Observable<DictionaryValue[]>;
  public editing = false;

  @Input()
  public dictionaryMeaning: string;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit(): void {
    this.dictionaryValues$ = this._dictionariesManager.selectAllDictionaryValues(this.dictionaryMeaning);
    this._dictionariesManager.loadAllDictionaryValues(this.dictionaryMeaning);
  }

  public onCreated(dictionaryValue: DictionaryValue): void {
    // const values: DictionaryValue[] = [...this.dictionaryValues];
    // values.push(dictionaryValue);
    // values.sort((lhs, rhs) => rhs.display.localeCompare(lhs.display));
    //
    // this.dictionaryValues = values;
  }

  public onDeleted(dictionaryValue: DictionaryValue): void {
    // const values: DictionaryValue[] = [...this.dictionaryValues];
    // const idx = this.dictionaryValues.findIndex(dv => dv.dictionaryValueId === dictionaryValue.dictionaryValueId);
    // if (idx !== -1) {
    //   values.splice(idx, 1);
    // }
    //
    // this.dictionaryValues = values;
  }

  public onUpdated(dictionaryValue: DictionaryValue): void {
    // const values: DictionaryValue[] = [...this.dictionaryValues];
    // const idx = this.dictionaryValues.findIndex(dv => dv.dictionaryValueId === dictionaryValue.dictionaryValueId);
    // if (idx !== -1) {
    //   values[idx] = dictionaryValue;
    //   values.sort((lhs, rhs) => rhs.display.localeCompare(lhs.display));
    // }
    //
    // this.dictionaryValues = values;
  }
}
