import { TestBed, inject } from '@angular/core/testing';

import { RformService } from './rform.service';

describe('RformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RformService]
    });
  });

  it('should be created', inject([RformService], (service: RformService) => {
    expect(service).toBeTruthy();
  }));
});
