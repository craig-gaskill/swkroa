import {JsonObject, JsonProperty} from 'json2typescript';

import {DictionaryValue} from './dictionary-value';

/**
 * JSON representation of a Dictionary.
 */
@JsonObject
export class Dictionary {
  @JsonProperty('dictionaryId', Number, true)
  public dictionaryId: number = undefined;

  @JsonProperty('display', String)
  public display: string = undefined;

  @JsonProperty('meaning', String)
  public meaning: string = undefined;

  @JsonProperty('active', Boolean)
  public active = true;

  @JsonProperty('updateCount', Number)
  public updatedCount = 0;

  @JsonProperty('values', [DictionaryValue], true)
  public values: DictionaryValue[] = undefined;
}
