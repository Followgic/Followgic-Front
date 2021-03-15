import { TestBed } from '@angular/core/testing';

import { Moment.EsService } from './moment.es.service';

describe('Moment.EsService', () => {
  let service: Moment.EsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Moment.EsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
