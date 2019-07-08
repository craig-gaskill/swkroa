import {Action, createReducer, on} from '@ngrx/store';

import {DictionaryState, DictionaryValueState, initialDictionaryState, LoadStatus} from './dictionary-store.state';
import {
  dictionaryValueAdd, dictionaryValueCancel,
  dictionaryValueDeleteSucceeded,
  dictionaryValueSaveCreated, dictionaryValueSaveUpdated,
  loadDictionaries,
  loadDictionariesFailed,
  loadDictionariesSucceeded,
  loadDictionaryValues,
  loadDictionaryValuesFailed,
  loadDictionaryValuesSucceeded,
  resetDictionaries,
  resetDictionaryValues
} from './dictionary-store.actions';
import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';

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
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx === -1) {
      dvs.push({
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: undefined,
        dictionaryValuesLoadStatus: LoadStatus.Loading,
        dictionaryValuesLoadError: undefined
      });
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(loadDictionaryValuesSucceeded, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
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
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
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
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(dictionaryValueAdd, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values = [...dvs[idx].dictionaryValues, new DictionaryValue()];

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(dictionaryValueCancel, (state, action) => {
    // if we are canceling a new Dictionary Value
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (!action.dictionaryValue.dictionaryValueId && idx >= 0) {
      const values = [...dvs[idx].dictionaryValues];
      const existingIdx = values.findIndex(v => v.dictionaryValueId === action.dictionaryValue.dictionaryValueId);
      if (existingIdx >= 0) {
        // remove the new Dictionary Value that was canceled
        values.splice(existingIdx, 1);
      }

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(dictionaryValueSaveCreated, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values = [...dvs[idx].dictionaryValues, action.dictionaryValue];
      values.sort((lhs, rhs) => lhs.display.localeCompare(rhs.display));

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(dictionaryValueSaveUpdated, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values = [...dvs[idx].dictionaryValues];
      const existingIdx = values.findIndex(v => v.dictionaryValueId === action.dictionaryValue.dictionaryValueId);
      if (existingIdx >= 0) {
        values.splice(existingIdx, 1, action.dictionaryValue);
      }
      values.sort((lhs, rhs) => lhs.display.localeCompare(rhs.display));

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(dictionaryValueDeleteSucceeded, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values = [...dvs[idx].dictionaryValues];
      const existingIdx = values.findIndex(v => v.dictionaryValueId === action.dictionaryValue.dictionaryValueId);
      if (existingIdx >= 0) {
        values.splice(existingIdx, 1);
      }

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
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
