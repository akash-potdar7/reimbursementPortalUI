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

  private partuculars: Particular[];

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

  createColumnDefs() {
    const columnDefinitions = [
      { field: 'billDate', width: 100 },
      { field: 'billNumber', width: 100 },
      { field: 'rType', width: 100 },
      { field: 'projectDetail', width: 150 },
      { field: 'noOfPersons', width: 130 },
      { field: 'amount', width: 100 }
    ];
    return columnDefinitions;
  }

  initGridRowData() {
    let reimbursements = this.employeeObj.reimbursements;
    let particular: Particular;
    if (reimbursements && reimbursements.length > 0) {
      this.particularsGridToggler = false; // ngClass ... ngIf ~ ngClass: hide
      this.particularsFormToggler = false; // ngIf: hide
      this.particularsActionBarToggler = true; // ngIf

      reimbursements.forEach(element => {
        particular = {
          id: element.id,
          billDate: element.billDate,
          billNumber: element.billNumber,
          rType: element.rType.typeName,
          projectDetail: element.projectDetail.projectName,
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
    this.particularsGridToggler = false;

    particular.projectDetail = particular.projectDetail.split("-")[0].trim();

    let currentRowData = this.rowData;
    currentRowData.push(particular);
    this.rowData = currentRowData;
    this.api.setRowData(this.rowData);
  }

  clearParticularsFormData() {
    this.particular = {};
    this.particularsActionBarToggler = true;
    this.particularsFormToggler = false;
    this.particularsGridToggler = this.rowData.length > 0 ? false : true;
  }

  addMoreParticular() {
    this.clearParticularsFormData();
    this.particularsFormToggler = true;
    this.particularsActionBarToggler = false;
    this.particularsGridToggler = false;
  }

  finalizeOnParticulars() {
    this.employeeObj.reimbursements = this.rowData;
    let reimbursements = this.employeeObj.reimbursements;
    this.employeeObj.reimbursements = []; // emptying because, overriding would be tidious.
    let rTypes = this.rTypes;
    let projects = this.projects
    // loop over reimbursements, on each element set full reimbursement data in which drop-down values are objects.
    reimbursements.forEach(reimbursement => {
      let fullRTypeObj = rTypes.filter(rType => rType.typeName === reimbursement.rType);
      let fullProjectObj = projects.filter(project => {
        console.log(reimbursement.projectDetail)
        return project.projectName === reimbursement.projectDetail
      });

      delete reimbursement["projectName"];
      delete reimbursement["typeName"];

      reimbursement.rType = fullRTypeObj[0];
      reimbursement.projectDetail = fullProjectObj[0];

      this.employeeObj.reimbursements.push(reimbursement);
    });
    const empObj = this.employeeObj;
    this.rformService.storeReimbursements(empObj);
  }

}
