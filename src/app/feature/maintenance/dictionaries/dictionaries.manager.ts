import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable} from 'rxjs';

import {DictionaryService} from '../../../core/dictionary/dictionary-service';
import {DictionaryState, LoadStatus} from './store/dictionary-store.state';
import {DictionariesModule} from './dictionaries.module';
import {Dictionary} from '../../../core/dictionary/dictionary';
import {selectAllDictionaries} from './store/dictionary-store.selectors';
import {loadDictionariesFailed, loadDictionariesSucceeded} from './store/dictionary-store.actions';

@Injectable({
  providedIn: DictionariesModule
})
export class DictionariesManager {
  private _loadingSubject$ = new BehaviorSubject<LoadStatus>(undefined);

  constructor(private _dictionaryService: DictionaryService,
              private _dictionaryStore: Store<DictionaryState>
  ) { }

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
    this._dictionaryService.getDictionaries(0, 0)
      .subscribe(
        results => this._dictionaryStore.dispatch(loadDictionariesSucceeded({dictionaries: results})),
        () => this._dictionaryStore.dispatch(loadDictionariesFailed)
      );

    return this._loadingSubject$.asObservable();
  }
}
