import {Dictionary} from '../../../../core/dictionary/dictionary';
import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';
import {LoadStatus, ViewStatus} from '../../../../app-store.state';

export interface DictionaryValueState {
  dictionaryMeaning: string;
  dictionaryValues: DictionaryValue[];
  dictionaryValuesLoadStatus: LoadStatus;
  dictionaryValuesLoadError: string;
}

export interface DictionaryState {
  dictionaries: Dictionary[];
  dictionariesLoadStatus: LoadStatus;
  dictionariesLoadError: string;
  dictionaryValueStates: DictionaryValueState[];
  dictionaryViewStatus: ViewStatus;
}

export const initialDictionaryState: DictionaryState = {
  dictionaries: undefined,
  dictionariesLoadStatus: undefined,
  dictionariesLoadError: undefined,
  dictionaryValueStates: [],
  dictionaryViewStatus: ViewStatus.View
};
