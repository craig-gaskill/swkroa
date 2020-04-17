import {Injectable} from '@angular/core';

import {CgtDictionaryServiceConfig} from '@cagst/ngx-dictionary';

import {environment} from '../../../environments/environment';

@Injectable()
export class DictionaryServiceConfig implements CgtDictionaryServiceConfig {
  baseUrl = environment.serviceUrl + '/dictionaries';
}
