import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {DictionaryService, DictionaryServiceConfig} from './dictionary.service';

describe('DictionaryService', () => {
  let service: DictionaryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DictionaryService,
        {
          provide: 'DictionaryServiceConfig',
          useClass: TestDictionaryServiceConfig
        }
      ]
    });

    service  = TestBed.get(DictionaryService);
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
export class TestDictionaryServiceConfig implements DictionaryServiceConfig {
  baseUrl = '';
}
