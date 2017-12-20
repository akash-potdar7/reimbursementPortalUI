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
  private rowData: any[];
  private columnDefs: any[];
  private rowCount: string;

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
    this.rowData = [];
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      rowSelection: 'multiple',
      onGridReady: (params) => {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.initGridRowData();
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.particularsFormToggler = true;
    this.rformService.getRTypes().subscribe(data => {
      this.rTypes = data;
      return data;
    });
    this.rformService.getProjects().subscribe(data => {
      this.projects = data;
      return data;
    });
  }

  initGridRowData() {
    let reimbursements = this.employeeObj.reimbursements;
    let particular: Particular;
    if (reimbursements && reimbursements.length > 0) {
      this.particularsGridToggler = false; //ngIf ... ngIf ~ ngClass: hide
      this.particularsFormToggler = false; //ngClass: hide
      this.particularsActionBarToggler = true; // ngIf

      reimbursements.forEach(element => {
        particular = {
          id: element.id,
          billDate: element.billDate,
          billNumber: element.billNumber,
          typeName: element.rType.typeName,
          projectName: element.projectDetail.projectName,
          noOfPersons: element.noOfPersons,
          amount: element.amount
        }
        this.rowData.push(particular);
      });
      this.api.setRowData(this.rowData);
    }
  }

  addParticular(particular: Particular) {
    this.particularsActionBarToggler = true;
    this.particularsFormToggler = false;
    console.log(particular);
    let currentRowData = this.rowData;
    console.log("current= "+currentRowData);
    currentRowData.push(particular);
    console.log("plus " +currentRowData);
    this.rowData = currentRowData;
    this.api.setRowData(this.rowData);
  }

  createColumnDefs() {
    const columnDefinitions = [
      { field: 'billDate', width: 100 },
      { field: 'billNumber', width: 100 },
      { field: 'typeName', width: 100 },
      { field: 'projectName', width: 150 },
      { field: 'noOfPersons', width: 130 },
      { field: 'amount', width: 100 }
    ];
    return columnDefinitions;
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
    // take all the row data and make a service call.
    console.log('final rows for employee ' + this.employeeObj.empNo + ' is= ' + this.rowData);
    const empObj = this.employeeObj;
    this.rformService.storeReimbursements(empObj);
  }
}
