import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DebuggerService} from './debugger.service';
import {EditorComponent} from "./editor.component";

import * as acorn from 'acorn';

@Component({
  selector: 'commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements AfterViewInit {
  baseUrl = "http://www.protractortest.org";
  dbg: DebuggerService;
  dbgOutput = '';

  @ViewChild(EditorComponent)
  private editor: EditorComponent;

  constructor(dbg: DebuggerService) {
    this.dbg = dbg;
  }

  ngAfterViewInit() {
    this.addCommand("var test = 'drop2';");
    this.addCommand("element(by.id(test)).click();");
    this.addCommand("element(by.linkText('Setting Up Protractor')).click();");

  }

  parse() {
    let parsed = acorn.parse(this.editor.getScript());
    console.log(parsed);
    this.dbgOutput = parsed.toString();
  }

  reload() {
    console.log(this.baseUrl);
    this.dbg.loadUrl(this.baseUrl)
        .subscribe(data => console.log("got " + data));
  }

  addCommand(command: string) {
    this.editor.addLine(command);
  }

  run() {
    this.dbg.sendDbgCmd(this.editor.getScript()).subscribe((result) => {
      console.log(result);
      this.dbgOutput = result.toString();
    });
  }

  step() {
    // This would be a great place to use streams...
    if (this.editor.statementIdx === 0) {
      this.dbg.loadUrl(this.baseUrl)
          .subscribe(() => this.runStep());
      return;
    }
    this.runStep();
  }

  runStep() {
    let cmd = this.editor.getNextStatement();
    console.log(cmd);
    this.dbg.sendDbgCmd(cmd).subscribe((result) => {
      console.log(result);
      this.dbgOutput = result.toString();
    });
  }
}
