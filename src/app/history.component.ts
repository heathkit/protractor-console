import {Component, EventEmitter, Output} from '@angular/core';
import {BrowserEventsService} from './browser-events.service'
import {ReplaySubject} from 'rxjs/Rx'

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  events: string;

  @Output() addCommand = new EventEmitter<string>();

  constructor(private eventsService: BrowserEventsService) {
    eventsService.browserEventsStream().subscribe((value) => {
      // TODO Replace this with elementors suggestions.
      let event = JSON.parse(value);
      if (event.id) {
        this.events = `element(by.id('${event.id}')).click();`;
      } else if (event.classList[0]) {
        this.events = `element(by.css('.${event.classList[0]}')).click();`;
      } else {
        this.events = `element(by.linkText('${event.linkText}')).click();`;
      }
    });
  }

  add() {
    this.addCommand.emit(this.events);
  }
}
