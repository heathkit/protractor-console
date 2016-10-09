/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DebuggerService } from './debugger.service';

describe('Service: Debugger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebuggerService]
    });
  });

  it('should list statements in a script', inject([DebuggerService], (service: DebuggerService) => {
    let expectedCommands = [
      'element(by.css("#drop2")).click()',
      'element(by.css(".dropdown.open .dropdown-menu li")).getText()',
      'element(by.id("drop1")).click()'
    ]
    let script = expectedCommands.join(';');

    let commands = service.parseScript(script);

    expect(commands[0]).toBe()
    expect(service).toBeTruthy();
  }));
});
