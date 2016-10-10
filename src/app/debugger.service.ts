import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import * as acorn from 'acorn';

@Injectable()
export class DebuggerService {

  constructor(private http: Http) { }

  parseScript(script: string) {
    let tree = acorn.parse(script);

    // Turn all the first-level expressions into separate commands
  }

  loadUrl(url: string) {
    let body = JSON.stringify({url});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('api/load', body, options);
  }
}
