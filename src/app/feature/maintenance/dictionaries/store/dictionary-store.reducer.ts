import {Action, createReducer, on} from '@ngrx/store';

import {DictionaryState, initialDictionaryState, LoadStatus} from './dictionary-store.state';
import {
  loadDictionaries,
  loadDictionariesFailed,
  loadDictionariesSucceeded,
  loadDictionaryValues,
  loadDictionaryValuesFailed,
  loadDictionaryValuesSucceeded,
  resetDictionaries,
  resetDictionaryValues
} from './dictionary-store.actions';

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
  on(resetDictionaries, () => initialDictionaryState),
  on(loadDictionaryValues, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(dv => dv.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    dvs.push({
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: undefined,
        dictionaryValuesLoadStatus: LoadStatus.Loading,
        dictionaryValuesLoadError: undefined
    });

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(loadDictionaryValuesSucceeded, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(dv => dv.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    dvs.push({
      dictionaryMeaning: action.dictionaryMeaning,
      dictionaryValues: action.values,
      dictionaryValuesLoadStatus: (action.values && action.values.length > 0) ? LoadStatus.Loaded : LoadStatus.NoContent,
      dictionaryValuesLoadError: undefined
    });

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(loadDictionaryValuesFailed, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(dv => dv.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    dvs.push({
      dictionaryMeaning: action.dictionaryMeaning,
      dictionaryValues: undefined,
      dictionaryValuesLoadStatus: LoadStatus.Error,
      dictionaryValuesLoadError: action.error
    });

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(resetDictionaryValues, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(dv => dv.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  })
);

export function dictionaryReducer(state: DictionaryState | undefined, action: Action) {
  return reducer(state, action);
}
