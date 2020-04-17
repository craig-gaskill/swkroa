import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {CgtDictionary} from '@cagst/ngx-dictionary';

import {DictionariesManager} from './dictionaries.manager';
import {ViewStatus} from '../../../app-store.state';

@Component({
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionariesComponent implements OnInit, OnDestroy {
  public readonly VIEW_STATUS = ViewStatus;

  public dictionaries$: Observable<CgtDictionary[]>;
  public viewStatus$: Observable<ViewStatus>;
  public expandedMeaning: string;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit() {
    this.dictionaries$ = this._dictionariesManager.selectAllDictionaries();
    this.viewStatus$   = this._dictionariesManager.getViewStatus();

    this._dictionariesManager.loadAllDictionaries();
  }

  public ngOnDestroy(): void {
    this._dictionariesManager.resetDictionaries();
  }

  public onExpandDictionary(meaning: string): void {
    this.expandedMeaning = meaning;
  }

  public onAddDictionaryValue(meaning: string): void {
    this._dictionariesManager.addDictionaryValue(meaning);
  }
}
