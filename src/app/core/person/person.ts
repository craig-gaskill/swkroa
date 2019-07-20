import {JsonObject, JsonProperty} from 'json2typescript';
import {CgtPerson} from '@cagst/ngx-person';

@JsonObject('Person')
export class Person implements CgtPerson {
  @JsonProperty('personId', Number, true)
  public personId: number = undefined;

  @JsonProperty('titleCd', Number, true)
  public titleCd: number = undefined;

  @JsonProperty('firstName', String)
  public firstName: string = undefined;

  @JsonProperty('middleName', String, true)
  public middleName: string = undefined;

  @JsonProperty('lastName', String)
  public lastName: string = undefined;

  @JsonProperty('active', Boolean)
  public active = true;

  @JsonProperty('updateCount', Number)
  public updateCount = 0;
}
