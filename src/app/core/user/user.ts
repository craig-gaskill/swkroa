import {JsonObject, JsonProperty} from 'json2typescript';

import {Person} from '../person/person';

/**
 * JSON representation of a User.
 */
@JsonObject('User')
export class User {
  @JsonProperty('userId', Number, true)
  public userId: number = undefined;

  @JsonProperty('person', Person)
  public person: Person = new Person();

  @JsonProperty('username', String)
  public username: string = undefined;

  @JsonProperty('active', Boolean)
  public active = true;

  @JsonProperty('updateCount', Number)
  public updateCount = 0;
}
