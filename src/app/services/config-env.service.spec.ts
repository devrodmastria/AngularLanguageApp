import { TestBed } from '@angular/core/testing';

import { ConfigEnvService } from './config-env.service';

describe('ConfigEnvService', () => {
  let service: ConfigEnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigEnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
