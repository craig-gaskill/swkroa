import {Dictionary} from '../../../../core/dictionary/dictionary';

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
}

export const initialDictionaryState: DictionaryState = {
  dictionaries: undefined
};
