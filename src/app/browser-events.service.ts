import {ReplaySubject} from 'rxjs/Rx'
import {Injectable} from '@angular/core';

@Injectable()
export class BrowserEventsService {
  browserEventsStream() : ReplaySubject<string> {
    let subject = new ReplaySubject<string>(1);
    let ws = new WebSocket(`ws://${window.location.hostname}:8080`, 'events');
    ws.onmessage = (e: MessageEvent) => {
      return subject.next(e.data);
    }
    return subject;
  }
}