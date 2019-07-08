import {createFeatureSelector, createSelector} from '@ngrx/store';

import {DictionaryState, DictionaryValueState, LoadStatus} from './dictionary-store.state';
import {Dictionary} from '../../../../core/dictionary/dictionary';

const getAllDictionaries       = (state: DictionaryState): Dictionary[] => state.dictionaries;
const getDictionaryLoadStatus  = (state: DictionaryState): LoadStatus => state.dictionariesLoadStatus;
const getDictionaryLoadError   = (state: DictionaryState): string => state.dictionariesLoadError;
const getDictionaryValueStates = (state: DictionaryState): DictionaryValueState[] => state.dictionaryValueStates;

export const selectDictionaryState      = createFeatureSelector<DictionaryState>('dictionaries');
export const selectAllDictionaries      = createSelector(selectDictionaryState, getAllDictionaries);
export const selectDictionaryLoadStatus = createSelector(selectDictionaryState, getDictionaryLoadStatus);
export const selectDictionaryLoadError  = createSelector(selectDictionaryState, getDictionaryLoadError);

export const selectDictionaryValueStates = createSelector(selectDictionaryState, getDictionaryValueStates);

export const selectAllDictionaryValues = (dictionaryMeaning: string) =>
  createSelector(selectDictionaryValueStates, states => {
    const state = states.find(s => s.dictionaryMeaning === dictionaryMeaning);
    return state ? state.dictionaryValues : undefined;
  });
