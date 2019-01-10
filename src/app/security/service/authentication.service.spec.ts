import {Injectable} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {AuthenticationService, AuthenticationServiceConfig} from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService,
        {
          provide: 'AuthenticationServiceConfig',
          useClass: TestAuthenticationServiceConfig
        }
      ]
    });

    service  = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

@Injectable()
export class TestAuthenticationServiceConfig implements AuthenticationServiceConfig {
  baseUrl = '';
}
