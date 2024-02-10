import { TestBed } from '@angular/core/testing';

import { TemanService } from './teman.service';

describe('TemanService', () => {
  let service: TemanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
