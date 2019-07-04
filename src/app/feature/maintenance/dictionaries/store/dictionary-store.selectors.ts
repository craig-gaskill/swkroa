import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {DictionaryState} from './dictionary-store.state';
import {Dictionary} from '../../../../core/dictionary/dictionary';

const getAllDictionaries = (state: DictionaryState): Dictionary[] => state.dictionaries;

export const selectDictionaryState: MemoizedSelector<object, DictionaryState> = createFeatureSelector<DictionaryState>('dictionaries');
export const selectAllDictionaries: MemoizedSelector<object, Dictionary[]>    = createSelector(selectDictionaryState, getAllDictionaries);
