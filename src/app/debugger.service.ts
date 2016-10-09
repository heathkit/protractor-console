import { Injectable } from '@angular/core';
import * as acorn from 'acorn';

@Injectable()
export class DebuggerService {

  constructor() { }

  parseScript(script: string) {
    let tree = acorn.parseScript(script);

    // Turn all the first-level expressions into separate commands
  }
}
