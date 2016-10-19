import {Component} from '@angular/core';
import {BrowserEventsService} from './browser-events.service'
import {ReplaySubject} from 'rxjs/Rx'

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  events: ReplaySubject<string>;

  constructor(private eventsService: BrowserEventsService) {
    this.events = eventsService.browserEventsStream();
  }
}
