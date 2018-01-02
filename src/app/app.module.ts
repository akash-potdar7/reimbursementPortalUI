import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RformComponent } from './rform/rform.component';

import { RParticularsFormComponent } from './r-particulars-form/r-particulars-form.component';
import { RformRecordsComponent } from './rform-records/rform-records.component';

import { RformService } from './common/rform.service';
import { RformDataService } from './common/form.data.service';

import { AgGridModule } from "ag-grid-angular";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RformComponent,
    RParticularsFormComponent,
    RformRecordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgGridModule.withComponents([
      RParticularsFormComponent
    ]),
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [RformService, RformDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
