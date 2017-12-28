import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DatePickerModule } from './lib/public_api';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatePickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
