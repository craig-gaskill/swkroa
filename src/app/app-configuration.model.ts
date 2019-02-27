/**
 * Provides configuration options for the application.
 *
 * @author Craig Gaskill
 */
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('AppConfiguration')
export class AppConfiguration {
  @JsonProperty('inputAppearance', String, true)
  public inputAppearance = 'outline';

  @JsonProperty('dateFormat', String, true)
  public dateFormat = 'mediumDate';
}
