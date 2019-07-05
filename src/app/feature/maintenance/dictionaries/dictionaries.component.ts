import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Dictionary} from '../../../core/dictionary/dictionary';
import {DictionariesManager} from './dictionaries.manager';

@Component({
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionariesComponent implements OnInit {
  public dictionaries: Observable<Dictionary[]>;
  public expandedMeaning: string;

  constructor(private _dictionariesManager: DictionariesManager
  ) { }

  public ngOnInit() {
    this.dictionaries = this._dictionariesManager.selectAllDictionaries();
    this._dictionariesManager.loadAllDictionaries();
  }

  public onExpandDictionary(meaning: string): void {
    this.expandedMeaning = meaning;
  }

  public onCollapsedDictionary(): void {
    this.expandedMeaning = undefined;
  }

  public onAddDictionaryValue(): void {
  }
}
