import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

import {DictionaryService} from '../../../core/dictionary/dictionary-service';
import {DictionaryValue} from '../../../core/dictionary/dictionary-value';

@Component({
  selector: 'swkroa-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryDetailComponent {
  private _expanded = false;
  private _loaded   = false;
  private _editing  = false;

  public dictionaryValues: DictionaryValue[];

  @Input()
  public dictionaryMeaning: string;

  @Input()
  public set expanded(expanded: boolean) {
    this._expanded = expanded;

    if (this._expanded && !this._loaded) {
      this.loadDictionaryValues();
    }
  }

  public get editing(): boolean {
    return this._editing;
  }

  public set editing(editing: boolean) {
    this._editing = editing;
  }

  constructor(private _dictionaryService: DictionaryService,
              private _changeDetectorRef: ChangeDetectorRef
  ) { }

  private loadDictionaryValues(): void {
    this._dictionaryService.getDictionaryValues(this.dictionaryMeaning, 0, 0)
      .subscribe(
        values => {
          this.dictionaryValues = [...values];
          this._changeDetectorRef.markForCheck();
        },
        () => console.log('Failed to load Dictionary Values for [' + this.dictionaryMeaning + ']'),
        () => this._loaded = true);
  }

  public onCreated(dictionaryValue: DictionaryValue): void {
    const values: DictionaryValue[] = [...this.dictionaryValues];
    values.push(dictionaryValue);
    values.sort((lhs, rhs) => rhs.display.localeCompare(lhs.display));

    this.dictionaryValues = values;
  }

  public onDeleted(dictionaryValue: DictionaryValue): void {
    const values: DictionaryValue[] = [...this.dictionaryValues];
    const idx = this.dictionaryValues.findIndex(dv => dv.dictionaryValueId === dictionaryValue.dictionaryValueId);
    if (idx !== -1) {
      values.splice(idx, 1);
    }

    this.dictionaryValues = values;
  }

  public onUpdated(dictionaryValue: DictionaryValue): void {
    const values: DictionaryValue[] = [...this.dictionaryValues];
    const idx = this.dictionaryValues.findIndex(dv => dv.dictionaryValueId === dictionaryValue.dictionaryValueId);
    if (idx !== -1) {
      values[idx] = dictionaryValue;
      values.sort((lhs, rhs) => rhs.display.localeCompare(lhs.display));
    }

    this.dictionaryValues = values;
  }
}
