import { TestBed } from '@angular/core/testing';

import { MagoService } from './mago.service';

describe('MagoService', () => {
  let service: MagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
