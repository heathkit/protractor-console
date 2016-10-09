import { AfterViewInit, Directive, Renderer } from '@angular/core';

var CodeMirror = require('codemirror');

//declare var CodeMirror: any;

@Directive({
  selector: '[editor]'
})
export class EditorDirective implements AfterViewInit {
  editor: any;

  constructor(private _renderer: Renderer) {}

  ngAfterViewInit() {
    this.editor = CodeMirror.fromTextArea(
        this._renderer.selectRootElement('[editor]'),
        {
          lineNumbers: true,
          mode: {name: "javascript", globalVars: true}
        }
    );
  }
}