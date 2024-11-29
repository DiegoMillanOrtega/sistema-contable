import { TestBed } from '@angular/core/testing';

import { DatosFService } from './datos-f.service';

describe('DatosFService', () => {
  let service: DatosFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
