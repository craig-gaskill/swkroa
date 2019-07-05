import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {DictionaryState, LoadStatus} from './dictionary-store.state';
import {Dictionary} from '../../../../core/dictionary/dictionary';

const getAllDictionaries      = (state: DictionaryState): Dictionary[] => state.dictionaries;
const getDictionaryLoadStatus = (state: DictionaryState): LoadStatus => state.dictionariesLoadStatus;
const getDictionaryLoadError  = (state: DictionaryState): string => state.dictionariesLoadError;

export const selectDictionaryState: MemoizedSelector<object, DictionaryState> = createFeatureSelector<DictionaryState>('dictionaries');
export const selectAllDictionaries: MemoizedSelector<object, Dictionary[]>    = createSelector(selectDictionaryState, getAllDictionaries);
export const selectDictionaryLoadStatus: MemoizedSelector<object, LoadStatus> = createSelector(selectDictionaryState, getDictionaryLoadStatus);
export const selectDictionaryLoadError: MemoizedSelector<object, string>      = createSelector(selectDictionaryState, getDictionaryLoadError);
