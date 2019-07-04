import {Action, createReducer, on} from '@ngrx/store';

import {DictionaryState, initialDictionaryState} from './dictionary-store.state';
import {loadDictionaries, loadDictionariesFailed, loadDictionariesSucceeded, resetDictionaries} from './dictionary-store.actions';

const reducer = createReducer(initialDictionaryState,
  on(loadDictionaries),
  on(loadDictionariesSucceeded, (state, action) => ({...state, dictionaries: action.dictionaries})),
  on(loadDictionariesFailed, () => initialDictionaryState),
  on(resetDictionaries, () => initialDictionaryState)
);

export function dictionaryReducer(state: DictionaryState | undefined, action: Action) {
  return reducer(state, action);
}
