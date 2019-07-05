import {Dictionary} from '../../../../core/dictionary/dictionary';
import {DictionaryValue} from '../../../../core/dictionary/dictionary-value';

export enum LoadStatus {
  Loading,
  Loaded,
  NoContent,
  Error
}

export enum ViewStatus {
  View,
  Add,
  Edit
}

export interface DictionaryState {
  dictionaries: Dictionary[];
  dictionariesLoadStatus: LoadStatus;
  dictionariesLoadError: string;
  dictionaryValues: Map<string, DictionaryValue>;
}

export const initialDictionaryState: DictionaryState = {
  dictionaries: undefined,
  dictionariesLoadStatus: undefined,
  dictionariesLoadError: undefined,
  dictionaryValues: undefined
};
