import {createAction, props, union} from '@ngrx/store';

import {Dictionary} from '../../../../core/dictionary/dictionary';

export const loadDictionaries          = createAction('[Dictionaries] Load');
export const loadDictionariesSucceeded = createAction('[Dictionaries] Load Succeeded', props<{dictionaries: Dictionary[]}>());
export const loadDictionariesFailed    = createAction('[Dictionaries] Load Failed');
export const resetDictionaries         = createAction('[Dictionaries] Reset');

export const dictionaryActions = union({
  loadDictionaries,
  loadDictionariesSucceeded,
  loadDictionariesFailed,
  resetDictionaries
});
