import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { albumGuard } from './album.guard';

describe('albumGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => albumGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
