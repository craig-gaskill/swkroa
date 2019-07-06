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

  @Input()
  public dictionaryMeaning: string;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit(): void {
    this.dictionaryValues$ = this._dictionariesManager.selectAllDictionaryValues(this.dictionaryMeaning);
    this._dictionariesManager.loadAllDictionaryValues(this.dictionaryMeaning);
  }
}
