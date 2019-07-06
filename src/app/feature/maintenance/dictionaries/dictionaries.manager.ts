import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Dictionary} from '../../../core/dictionary/dictionary';
import {DictionaryState, LoadStatus} from './store/dictionary-store.state';
import {
  selectAllDictionaries, selectAllDictionaryValues,
  selectDictionaryLoadStatus,
} from './store/dictionary-store.selectors';
import {loadDictionaries, loadDictionaryValues, resetDictionaries, resetDictionaryValues} from './store/dictionary-store.actions';
import {DictionaryValue} from '../../../core/dictionary/dictionary-value';

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

  /**
   * Will reset the dictionaries back to its initial state.
   */
  public resetDictionaries(): void {
    this._dictionaryStore.dispatch(resetDictionaries());
  }

  /**
   * Will return an {Observable} that can be subscribed to to listen for changes to the list of Dictionary Values for the specified
   * dictionary meaning.
   *
   * @param dictionaryMeaning
   *    The meaning of the Dictionary to listed for changes to Dictionary Values on.
   */
  public selectAllDictionaryValues(dictionaryMeaning: string): Observable<DictionaryValue[]> {
    return this._dictionaryStore.select(selectAllDictionaryValues(dictionaryMeaning));
  }

  /**
   * Will load the dictionary values for the specified dictionary meaning.
   */
  public loadAllDictionaryValues(dictionaryMeaning: string): Observable<LoadStatus> {
    this._dictionaryStore.dispatch(loadDictionaryValues({dictionaryMeaning}));
    return this._dictionaryStore.select(selectDictionaryLoadStatus);
  }

  /**
   * Will reset the dictionary values (for the specified dictionary meaning) back to its initial state.
   */
  public resetDictionaryValues(dictionaryMeaning: string): void {
    this._dictionaryStore.dispatch(resetDictionaryValues({dictionaryMeaning}));
  }
}
