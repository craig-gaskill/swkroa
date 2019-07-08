import {JsonObject, JsonProperty} from 'json2typescript';

/**
 * JSON representation of a Dictionary's Value
 */
@JsonObject('DictionaryValue')
export class DictionaryValue {
  @JsonProperty('dictionaryValueId', Number, true)
  public dictionaryValueId: number = undefined;

  @JsonProperty('display', String)
  public display: string = undefined;

  @JsonProperty('meaning', String, true)
  public meaning: string = undefined;

  @JsonProperty('active', Boolean)
  public active = true;

  @JsonProperty('updateCount', Number)
  public updateCount = 0;
}
