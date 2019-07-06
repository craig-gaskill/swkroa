import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';

import {
  loadDictionaries,
  loadDictionariesFailed,
  loadDictionariesSucceeded,
  loadDictionaryValues, loadDictionaryValuesFailed,
  loadDictionaryValuesSucceeded
} from './dictionary-store.actions';
import {DictionaryService} from '../../../../core/dictionary/dictionary-service';

@Injectable()
export class DictionaryStoreEffects {
  constructor(private _actions$: Actions,
              private _dictionaryService: DictionaryService
  ) { }

  public loadDictionaries$ = createEffect(() => this._actions$.pipe(
    ofType(loadDictionaries),
    switchMap(action => this._dictionaryService.getDictionaries(0, 0).pipe(
      map(results => loadDictionariesSucceeded({dictionaries: results})),
      catchError(error => loadDictionariesFailed)
    ))
  ));

  public loadDictionaryValues$ = createEffect(() => this._actions$.pipe(
    ofType(loadDictionaryValues),
    switchMap(action => this._dictionaryService.getDictionaryValues(action.dictionaryMeaning, 0, 0).pipe(
      map(results => loadDictionaryValuesSucceeded({dictionaryMeaning: action.dictionaryMeaning, values: results})),
      catchError(error => loadDictionaryValuesFailed)
    ))
  ));
}
