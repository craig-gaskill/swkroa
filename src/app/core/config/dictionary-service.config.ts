import {Injectable} from '@angular/core';

import {DictionaryServiceConfig} from '../dictionary/dictionary.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConfigureDictionaryService implements DictionaryServiceConfig {
  baseUrl = environment.serviceUrl + '/dictionaries';
}
