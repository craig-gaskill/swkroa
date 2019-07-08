import {createAction, props} from '@ngrx/store';

import {Dictionary} from '../../../../core/dictionary/dictionary';
import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';

export const loadDictionaries          = createAction('[Dictionaries] Load');
export const loadDictionariesSucceeded = createAction('[Dictionaries] Load Succeeded', props<{dictionaries: Dictionary[]}>());
export const loadDictionariesFailed    = createAction('[Dictionaries] Load Failed', props<{error: string}>());
export const resetDictionaries         = createAction('[Dictionaries] Reset');

export const loadDictionaryValues          = createAction('[Dictionary Values] Load', props<{dictionaryMeaning: string}>());
export const loadDictionaryValuesSucceeded = createAction('[Dictionary Values] Load Succeeded', props<{dictionaryMeaning: string; values: DictionaryValue[]}>());
export const loadDictionaryValuesFailed    = createAction('[Dictionary Values] Load Failed', props<{dictionaryMeaning: string; error: string}>());
export const resetDictionaryValues         = createAction('[Dictionary Values] Reset', props<{dictionaryMeaning: string}>());

export const dictionaryValueAdd             = createAction('[Dictionary Value] Add', props<{dictionaryMeaning: string}>());
export const dictionaryValueEdit            = createAction('[Dictionary Value] Edit', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue}>());
export const dictionaryValueDelete          = createAction('[Dictionary Value] Delete', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue}>());
export const dictionaryValueCancel          = createAction('[Dictionary Value] Cancel', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue}>());

export const dictionaryValueSave            = createAction('[Dictionary Value] Save', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue}>());
export const dictionaryValueSaveCreated     = createAction('[Dictionary Value] Save Created', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue}>());
export const dictionaryValueSaveUpdated     = createAction('[Dictionary Value] Save Updated', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue}>());
export const dictionaryValueSaveFailed      = createAction('[Dictionary Value] Save Failed', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue, error: string}>());
export const dictionaryValueDeleteSucceeded = createAction('[Dictionary Value] Delete Succeeded', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue}>());
export const dictionaryValueDeleteFailed    = createAction('[Dictionary Value] Delete Failed', props<{dictionaryMeaning: string; dictionaryValue: DictionaryValue, error: string}>());
