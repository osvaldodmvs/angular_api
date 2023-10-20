import { TestBed } from '@angular/core/testing';

import { HttpLoggingInterceptor } from './http-logging.service';

describe('HttpLoggingService', () => {
  let service: HttpLoggingInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLoggingInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
