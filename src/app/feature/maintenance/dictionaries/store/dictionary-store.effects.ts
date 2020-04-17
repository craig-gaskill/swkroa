import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, exhaustMap, map, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import {CgtNotificationService} from '@cagst/ngx-components';
import {CgtDictionaryService, CgtDictionaryValueService} from '@cagst/ngx-dictionary';

import {
  dictionaryValueDelete, dictionaryValueDeleted, dictionaryValueDeleteFailed,
  dictionaryValueSave, dictionaryValueCreated, dictionaryValueUpdated, dictionaryValueSaveFailed,
  loadDictionaries, loadDictionariesFailed, loadDictionariesSucceeded,
  loadDictionaryValues, loadDictionaryValuesFailed, loadDictionaryValuesSucceeded
} from './dictionary-store.actions';
import {selectDictionaryValueStates} from './dictionary-store.selectors';
import {DictionaryState} from './dictionary-store.state';
import {LoadStatus} from '../../../../app-store.state';

@Injectable()
export class DictionaryStoreEffects {
  constructor(private _dictionaryStore: Store<DictionaryState>,
              private _actions$: Actions,
              private _dictionaryService: CgtDictionaryService,
              private _dictionaryValueService: CgtDictionaryValueService,
              private _notificationService: CgtNotificationService
  ) { }

  /**
   * Effect that responds to the [loadDictionaries] action to retrieve Dictionaries from the back-end.
   */
  public loadDictionaries$ = createEffect(() => this._actions$
    .pipe(
      ofType(loadDictionaries),
      exhaustMap(() => this._dictionaryService.getDictionaries(0, 0)
        .pipe(
          map(dictionaries => loadDictionariesSucceeded({dictionaries})),
          catchError(err => of(loadDictionariesFailed({error: err.error.message})))
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
      withLatestFrom(this._dictionaryStore.select(selectDictionaryValueStates)),
      exhaustMap(([action, states]) => {
        const vs = states.find(dvs => dvs.dictionaryMeaning === action.dictionaryMeaning);
        if (vs && (vs.dictionaryValuesLoadStatus === LoadStatus.Loaded || vs.dictionaryValuesLoadStatus === LoadStatus.NoContent)) {
          return EMPTY;
        } else {
          return this._dictionaryValueService.getDictionaryValues(action.dictionaryMeaning, 0, 0)
            .pipe(
              map(results =>
                loadDictionaryValuesSucceeded({dictionaryMeaning: action.dictionaryMeaning, values: results})
              ),
              catchError(err =>
                of(loadDictionaryValuesFailed({dictionaryMeaning: action.dictionaryMeaning, error: err.error.message}))
              )
            );
        }
      })
    )
  );

  /**
   * Effect that responds to the [dictionaryValueSave] action to persist the Dictionary Value to the back-end.
   */
  public dictionaryValueSave$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueSave),
      exhaustMap(action => {
        if (action.dictionaryValue.dictionaryValueId) {
          return this._dictionaryValueService.updateDictionaryValue(action.dictionaryMeaning, action.dictionaryValue)
            .pipe(
              map(result =>
                dictionaryValueUpdated({dictionaryMeaning: action.dictionaryMeaning, dictionaryValue: result})
              ),
              catchError(err => {
                const errorResponse = {
                  dictionaryMeaning: action.dictionaryMeaning,
                  dictionaryValue: action.dictionaryValue,
                  error: err.error.message
                };

                return of(dictionaryValueSaveFailed(errorResponse));
              })
            );
        } else {
          return this._dictionaryValueService.createDictionaryValue(action.dictionaryMeaning, action.dictionaryValue)
            .pipe(
              map(result =>
                dictionaryValueCreated({dictionaryMeaning: action.dictionaryMeaning, dictionaryValue: result})
              ),
              catchError(err => {
                const errorResponse = {
                  dictionaryMeaning: action.dictionaryMeaning,
                  dictionaryValue: action.dictionaryValue,
                  error: err.error.message
                };

                return of(dictionaryValueSaveFailed(errorResponse));
              })
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
      ofType(dictionaryValueCreated),
      tap(action => this._notificationService.success(`${action.dictionaryValue.display} was created.`))
    ), {dispatch: false}
  );

  /**
   * Effect that responds to the [dictionaryValueSaveUpdated] action to display a success notification.
   */
  public dictionaryValueSaveUpdated$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueUpdated),
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
      exhaustMap(action => this._dictionaryValueService.deleteDictionaryValue(action.dictionaryMeaning, action.dictionaryValue)
        .pipe(
          map(() =>
            dictionaryValueDeleted({dictionaryMeaning: action.dictionaryMeaning, dictionaryValue: action.dictionaryValue})
          ),
          catchError(err => {
            const errorResponse = {
              dictionaryMeaning: action.dictionaryMeaning,
              dictionaryValue: action.dictionaryValue,
              error: err.error.message
            };

            return of(dictionaryValueDeleteFailed(errorResponse));
          })
        )
      )
    )
  );

  /**
   * Effect that responds to the [dictionaryValueDeleteSucceeded] action to display a success notification.
   */
  public dictionaryValueDeleteSuccess$ = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueDeleted),
      tap(action => this._notificationService.success(`${action.dictionaryValue.display} was deleted.`))
    ), {dispatch: false}
  );

  /**
   * Effect that responds to the [dictionaryValueDeleteFailed] action to display a failed notification.
   */
  public dictionaryValueDeleteFailed = createEffect(() => this._actions$
    .pipe(
      ofType(dictionaryValueDeleteFailed),
      tap(action =>
        this._notificationService.failure(`Failed to delete ${action.dictionaryValue.display} due to ${action.error}.`)
      )
    ), {dispatch: false}
  );
}
