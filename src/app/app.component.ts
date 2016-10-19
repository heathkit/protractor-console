import {Component, ViewChild} from '@angular/core';
import {CommandsComponent} from './commands.component';

@Component({
  selector: 'console-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(CommandsComponent)
  private commandsComponent: CommandsComponent;

  onAdd(command: string) {
    this.commandsComponent.addCommand(command);
  }
}
