import {Injectable} from '@angular/core';

import {AuthenticationServiceConfig} from '../../security/service/authentication.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConfigureAuthenticationService implements AuthenticationServiceConfig {
  baseUrl = environment.serviceUrl + '/auth';
}
