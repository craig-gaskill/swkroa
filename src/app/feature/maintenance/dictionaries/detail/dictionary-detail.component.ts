import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';
import {DictionariesManager} from '../dictionaries.manager';
import {Dictionary} from '../../../../core/dictionary/dictionary';

@Component({
  selector: 'swkroa-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryDetailComponent implements OnInit {
  public dictionaryValues$: Observable<DictionaryValue[]>;

  @Input()
  public dictionary: Dictionary;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit(): void {
    this.dictionaryValues$ = this._dictionariesManager.selectAllDictionaryValues(this.dictionary.meaning);
    this._dictionariesManager.loadAllDictionaryValues(this.dictionary.meaning);
  }
}
