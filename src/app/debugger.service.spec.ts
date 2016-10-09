/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DebuggerService } from './debugger.service';

describe('Service: Debugger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebuggerService]
    });
  });

  it('should ...', inject([DebuggerService], (service: DebuggerService) => {
    expect(service).toBeTruthy();
  }));
});
