import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Dictionary} from '../../../core/dictionary/dictionary';
import {DictionaryState, LoadStatus} from './store/dictionary-store.state';
import {selectAllDictionaries, selectDictionaryLoadStatus} from './store/dictionary-store.selectors';
import {loadDictionaries} from './store/dictionary-store.actions';

@Injectable()
export class DictionariesManager {
  constructor(private _dictionaryStore: Store<DictionaryState>) { }

  /**
   * Will return an {Observable} that can be subscribed to to listen for changes to the list of Dictionaries.
   */
  public selectAllDictionaries(): Observable<Dictionary[]> {
    return this._dictionaryStore.select(selectAllDictionaries);
  }

  /**
   * Will load the dictionaries and set that as the list of dictionaries, appending if necessary.
   */
  public loadAllDictionaries(): Observable<LoadStatus> {
    this._dictionaryStore.dispatch(loadDictionaries());
    return this._dictionaryStore.select(selectDictionaryLoadStatus);
  }
}
