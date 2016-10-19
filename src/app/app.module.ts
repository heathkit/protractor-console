import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CommandsComponent } from './commands.component';
import { HistoryComponent } from './history.component';
import { EditorComponent } from './editor.component';
import { BrowserEventsService } from './browser-events.service';
import { DebuggerService } from './debugger.service';

@NgModule({
  declarations: [
    AppComponent,
    CommandsComponent,
    EditorComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    BrowserEventsService,
    DebuggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
