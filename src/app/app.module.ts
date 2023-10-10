import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule //novo modulo adicionado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
