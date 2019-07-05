import {createAction, props} from '@ngrx/store';

import {Dictionary} from '../../../../core/dictionary/dictionary';
import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';

export const loadDictionaries          = createAction('[Dictionaries] Load');
export const loadDictionariesSucceeded = createAction('[Dictionaries] Load Succeeded', props<{dictionaries: Dictionary[]}>());
export const loadDictionariesFailed    = createAction('[Dictionaries] Load Failed', props<{error: string}>());
export const resetDictionaries         = createAction('[Dictionaries] Reset');

export const loadDictionaryValues          = createAction('[Dictionary Values] Load', props<{dictionaryMeaning: string}>());
export const loadDictionaryValuesSucceeded = createAction('[Dictionary Values] Load Succeeded', props<{dictionaryMeaning: string; values: DictionaryValue[]}>());
export const loadDictionaryValuesFailed    = createAction('[Dictionary Values] Load Failed');
export const resetDictionaryValues         = createAction('[Dictionary Values] Reset', props<{dictionaryMeaning: string}>());
