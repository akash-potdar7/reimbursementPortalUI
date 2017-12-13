import { Component, OnInit } from '@angular/core';
import { Particular } from './Particular';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';

@Component({
  selector: 'app-r-particulars-form',
  templateUrl: './r-particulars-form.component.html',
  styleUrls: ['./r-particulars-form.component.css']
})
export class RParticularsFormComponent implements OnInit {

  private gridOptions: GridOptions;
  private icons: any;
  public rowData: any[];
  public columnDefs: any[];
  public rowCount: string;

  private api: GridApi;
  private columnApi: ColumnApi;
  particular: any = {};
  particulars: Array<Particular> = [];

  constructor() {
    this.gridOptions = <GridOptions>{};
    this.rowData = this.createRowData();
    this.columnDefs = this.createColumnDefs();
  }

  private onReady(params) {
    console.log(params);
    //this.api = params.api;
    //this.columnApi = params.columnApi;
  }

  ngOnInit() {
  }

  addParticular(particular: Particular) {
    console.log("RParticularsFormComponent.addParticular()" + particular);
    this.createParticulars(particular);
  }

  createParticulars(particular: Particular) {
    this.particulars.push(particular);
    console.log(this.particulars);
  }

  createColumnDefs() {
    const columnDefinitions = [
      { field: 'firstName', width: 100 },
      { field: 'lastName', width: 100 },
      { field: 'phoneNumber', width: 200 }
    ];
    return columnDefinitions;
  };

  createRowData() { return null }

}
