import {Action, createReducer, on} from '@ngrx/store';

import {DictionaryState, initialDictionaryState, LoadStatus} from './dictionary-store.state';
import {loadDictionaries, loadDictionariesFailed, loadDictionariesSucceeded, resetDictionaries} from './dictionary-store.actions';

const reducer = createReducer(initialDictionaryState,
  on(loadDictionaries, (state) => ({
    ...state,
    dictionaries: undefined,
    dictionariesLoadStatus: LoadStatus.Loading,
    dictionariesLoadError: undefined
  })),
  on(loadDictionariesSucceeded, (state, action) => ({
    ...state,
    dictionaries: action.dictionaries,
    dictionariesLoadStatus: (action.dictionaries && action.dictionaries.length > 0 ? LoadStatus.Loaded : LoadStatus.NoContent)
  })),
  on(loadDictionariesFailed, (state, action) => ({
    ...state,
    dictionariesLoadStatus: LoadStatus.Error,
    dictionariesLoadError: action.error
  })),
  on(resetDictionaries, () => initialDictionaryState)
);

export function dictionaryReducer(state: DictionaryState | undefined, action: Action) {
  return reducer(state, action);
}
