import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RformComponent } from './rform/rform.component';
import { RformService } from './common/rform.service';
import { RParticularsFormComponent } from './r-particulars-form/r-particulars-form.component';

import { AgGridModule } from "ag-grid-angular";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RformComponent,
    RParticularsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgGridModule.withComponents([
      RParticularsFormComponent
    ])
  ],
  providers: [RformService],
  bootstrap: [AppComponent]
})
export class AppModule { }
