import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {CgtNotificationService} from '@cagst/ngx-components';

import {
  dictionaryValueDelete, dictionaryValueDeleteFailed, dictionaryValueDeleteSucceeded,
  dictionaryValueSave, dictionaryValueSaveCreated, dictionaryValueSaveFailed, dictionaryValueSaveUpdated,
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
              private _dictionaryService: DictionaryService,
              private _notificationService: CgtNotificationService
  ) { }

  /**
   * Effect that responds to the [loadDictionaries] action to retrieve Dictionaries from the back-end.
   */
  public loadDictionaries$ = createEffect(() => this._actions$
    .pipe(
      ofType(loadDictionaries),
      switchMap(() => this._dictionaryService.getDictionaries(0, 0)
        .pipe(
          map(dictionaries => loadDictionariesSucceeded({dictionaries})),
          catchError(error => loadDictionariesFailed)
        )
      )
    )
  );

  /**
   * Effect that responds to the [loadDictionaryValues] action to retrieve Dictionary Values for the dictionary meaning
   * associated with the action from the back-end.
   */
  public loadDictionaryValues$ = createEffect(() => this._actions$
    .pipe(
      ofType(loadDictionaryValues),
      switchMap(action => this._dictionaryService.getDictionaryValues(action.dictionaryMeaning, 0, 0)
        .pipe(
          map(results => loadDictionaryValuesSucceeded({dictionaryMeaning: action.dictionaryMeaning, values: results})),
          catchError(error => loadDictionaryValuesFailed)
        )
      )
    )
  );

  /**
   * Effect that responds to the [dictionaryValueSave] action to persist the Dictionary Value to the back-end.
   */
  public dictionaryValueSave$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueSave),
      switchMap(action => {
        if (action.dictionaryValue.dictionaryValueId) {
          return this._dictionaryService.updateDictionaryValue(action.dictionaryMeaning, action.dictionaryValue)
            .pipe(
              map(result => dictionaryValueSaveUpdated({dictionaryMeaning: action.dictionaryMeaning, dictionaryValue: result})),
              catchError(error => dictionaryValueSaveFailed)
            );
        } else {
          return this._dictionaryService.createDictionaryValue(action.dictionaryMeaning, action.dictionaryValue)
            .pipe(
              map(result => dictionaryValueSaveCreated({dictionaryMeaning: action.dictionaryMeaning, dictionaryValue: result})),
              catchError(error => dictionaryValueSaveFailed)
            );
        }
      })
    )
  );

  /**
   * Effect that responds to the [dictionaryValueSaveCreated] action to display a success notification.
   */
  public dictionaryValueSaveCreated$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueSaveCreated),
      tap(action => this._notificationService.success(`${action.dictionaryValue.display} was created.`))
    ), {dispatch: false}
  );

  /**
   * Effect that responds to the [dictionaryValueSaveUpdated] action to display a success notification.
   */
  public dictionaryValueSaveUpdated$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueSaveUpdated),
      tap(action => this._notificationService.success(`${action.dictionaryValue.display} was updated.`))
    ), {dispatch: false}
  );

  /**
   * Effect that responds to the [dictionaryValueSaveFailed] action to display a failed notification.
   */
  public dictionaryValueSaveFailed$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueSaveFailed),
      tap(action => this._notificationService.failure(`Failed to save ${action.dictionaryValue.display}.`))
    ), {dispatch: false}
  );

  /**
   * Effect that responds to the [dictionaryValueDelete] action to delete (inactivate) the Dictionary Value from the back-end.
   */
  public dictionaryValueDelete$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueDelete),
      switchMap(action => this._dictionaryService.deleteDictionaryValue(action.dictionaryMeaning, action.dictionaryValue)
        .pipe(
          map(() => dictionaryValueDeleteSucceeded({dictionaryMeaning: action.dictionaryMeaning, dictionaryValue: action.dictionaryValue})),
          catchError(error => dictionaryValueDeleteFailed)
        )
      )
    )
  );

  /**
   * Effect that responds to the [dictionaryValueDeleteSucceeded] action to display a success notification.
   */
  public dictionaryValueDeleteSuccess$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueDeleteSucceeded),
      tap(action => this._notificationService.success(`${action.dictionaryValue.display} was deleted.`))
    ), {dispatch: false}
  );

  /**
   * Effect that responds to the [dictionaryValueDeleteFailed] action to display a failed notification.
   */
  public dictionaryValueDeleteFailed = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueDeleteFailed),
      tap(action => this._notificationService.failure(`Failed to delete ${action.dictionaryValue.display}.`))
    ), {dispatch: false}
  );

}
