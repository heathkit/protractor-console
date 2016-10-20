import { AfterViewInit, Directive, Renderer } from '@angular/core';
import 'codemirror/mode/javascript/javascript'
import * as acorn from 'acorn';

var CodeMirror = require('codemirror');

@Directive({
  selector: '[editor]'
})
export class EditorComponent implements AfterViewInit {
  editor: any;
  statementIdx = 0;
  private parseTree;

  constructor(private _renderer: Renderer) {}

  // Implement statement iterating
  // reset position if the doc changes
  // add method for getting the next statement
  // highlight current statement

  ngAfterViewInit() {
    this.editor = CodeMirror.fromTextArea(
        this._renderer.selectRootElement('[editor]'),
        {
          lineNumbers: true,
          styleActiveLine: true,
          gutters: ["current"],
          matchBrackets: true,
          tabSize: 2,
          lineWrapping: true,
          mode: {name: "javascript", globalVars: true}
        }
    );

    this.editor.on('change', this.changed.bind(this));
  }

  changed(instance, changeobj) {
    // TODO reset position
    this.parseTree = null;
    this.statementIdx = 0;
  }

  highlightStatement(statement) {
    function makeMarker() {
      var marker = document.createElement("div");
      marker.style.color = "#822";
      marker.innerHTML = "●";
      return marker;
    }

    this.editor.clearGutter("current");
    let start = this.editor.posFromIndex(statement.start);
    let end = this.editor.posFromIndex(statement.end);
    console.log("Setting gutter ", start);
    this.editor.setGutterMarker(start.line, "current", makeMarker());
  }


  getNextStatement() {
    if (!this.parseTree) {
      this.parseTree = acorn.parse(this.getScript());
    }
    let current = this.parseTree.body[this.statementIdx];
    if (!current) {
      this.editor.clearGutter("current");
      this.statementIdx = 0;
      return;
    }

    this.statementIdx++;

    console.log("Returning node ", current);
    this.highlightStatement(current);
    return this.getScript().slice(current.start, current.end);
  }

  getScript() {
    return this.editor.getValue();
  }

  addLine(value) {
    return this.editor.setValue(this.editor.getValue() + '\n' +
        value);
  }
}