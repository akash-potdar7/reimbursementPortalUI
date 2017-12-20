import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Particular } from './Particular';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
import { RformService } from '../common/rform.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-r-particulars-form',
  templateUrl: './r-particulars-form.component.html',
  styleUrls: ['./r-particulars-form.component.css']
})
export class RParticularsFormComponent implements OnInit, OnChanges {
 
  @Input() employeeObj: any; 

  private gridOptions: GridOptions;
  private icons: any;
  public rowData: any[];
  public columnDefs: any[];
  public rowCount: string;

  private api: GridApi;
  private columnApi: ColumnApi;
  particular: any = {};
  particulars: Array<Particular> = [];
  private projects: any[];
  private rTypes: any[];
  particularsGridToggler: boolean = true;
  particularsFormToggler: boolean = false;
  particularsActionBarToggler: boolean = false;

  constructor(private rformService: RformService) {
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      rowSelection: 'multiple'
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.particularsFormToggler = true;
    //make two service calls to fetch R.Type and Project drop-down data.
    this.rformService.getRTypes().subscribe(data => {
      this.rTypes = data;
      return data;
    });
    this.rformService.getProjects().subscribe(data => {
      this.projects = data;
      return data;
    });
  }

  addParticular(particular: Particular) {
    this.particularsFormToggler = false;
    this.particularsActionBarToggler = true;
    this.createParticulars(particular);
  }

  createParticulars(particular: Particular) {
    this.particularsGridToggler = false;
    this.particulars.push(particular);
    this.rowData = this.createRowData(this.particulars);
    this.gridOptions.api.setRowData(this.rowData);
  }

  createColumnDefs() {
    const columnDefinitions = [
      { field: 'date', width: 100 },
      { field: 'billId', width: 100 },
      { field: 'rType', width: 100 },
      { field: 'project', width: 150 },
      { field: 'noOfPersons', width: 130 },
      { field: 'amount', width: 100 }
    ];
    return columnDefinitions;
  };

  createRowData(particulars: Particular[]) {
    return particulars;
  }

  clearParticularsFormData() {
    this.particular = {};
  }

  addMoreParticular() {
    this.clearParticularsFormData();
    this.particularsFormToggler = true;
    this.particularsActionBarToggler = false;
    this.particularsGridToggler = false;
  }

  finalizeOnParticulars() {
    //take all the row data and make a service call.
    console.log("final rows= " + this.rowData);
  }
}
