import { TestBed } from '@angular/core/testing';

import { TiempoRealService } from './tiempo-real.service';

describe('TiempoRealService', () => {
  let service: TiempoRealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiempoRealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
