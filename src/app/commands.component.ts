import {Component, ViewChild} from '@angular/core';
import {DebuggerService} from './debugger.service';
import {EditorComponent} from "./editor.component";

@Component({
  selector: 'commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  baseUrl = "http://www.protractortest.org";
  dbg: DebuggerService;

  @ViewChild(EditorComponent)
  private editor: EditorComponent;

  constructor(dbg: DebuggerService) {
    this.dbg = dbg;
  }

  reload() {
    console.log(this.baseUrl);
    this.dbg.loadUrl(this.baseUrl)
        .subscribe(data => console.log("got " + data));
  }

  addCommand(command: string) {
    this.editor.addLine(command);
  }
}
