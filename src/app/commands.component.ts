import { Component } from '@angular/core';
import { DebuggerService } from './debugger.service';

@Component({
  selector: 'commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  baseUrl = "http://www.protractortest.org";
  dbg: DebuggerService;

  constructor(dbg: DebuggerService) {
    this.dbg = dbg;
  }

  reload() {

  }
}
