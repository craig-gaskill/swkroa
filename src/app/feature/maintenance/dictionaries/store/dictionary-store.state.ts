import {Dictionary} from '../../../../core/dictionary/dictionary';
import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';

export enum LoadStatus {
  Loading,
  Loaded,
  NoContent,
  Error
}

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
}

export const initialDictionaryState: DictionaryState = {
  dictionaries: undefined,
  dictionariesLoadStatus: undefined,
  dictionariesLoadError: undefined,
  dictionaryValueStates: []
};
