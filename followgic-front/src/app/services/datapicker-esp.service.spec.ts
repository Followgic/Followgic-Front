import { TestBed } from '@angular/core/testing';

import { DatapickerEspService } from './datapicker-esp.service';

describe('DatapickerEspService', () => {
  let service: DatapickerEspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapickerEspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
