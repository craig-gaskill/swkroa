import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {CgtDictionary, CgtDictionaryValue} from '@cagst/ngx-dictionary';

import {DictionariesManager} from '../dictionaries.manager';

@Component({
  selector: 'swkroa-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryDetailComponent implements OnInit {
  public dictionaryValues$: Observable<CgtDictionaryValue[]>;

  @Input()
  public dictionary: CgtDictionary;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit(): void {
    this.dictionaryValues$ = this._dictionariesManager.selectAllDictionaryValues(this.dictionary.meaning);
    this._dictionariesManager.loadAllDictionaryValues(this.dictionary.meaning);
  }
}
