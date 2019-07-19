import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';
import {UserServiceConfig} from '../user/user.service';

@Injectable()
export class ConfigureUserService implements UserServiceConfig {
  baseUrl = environment.serviceUrl + '/users';
}
