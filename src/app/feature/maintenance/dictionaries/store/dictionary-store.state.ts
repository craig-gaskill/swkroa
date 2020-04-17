import {CgtDictionary, CgtDictionaryValue} from '@cagst/ngx-dictionary';

import {LoadStatus, ViewStatus} from '../../../../app-store.state';

export interface DictionaryValueState {
  dictionaryMeaning: string;
  dictionaryValues: CgtDictionaryValue[];
  dictionaryValuesLoadStatus: LoadStatus;
  dictionaryValuesLoadError: string;
}

export interface DictionaryState {
  dictionaries: CgtDictionary[];
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
