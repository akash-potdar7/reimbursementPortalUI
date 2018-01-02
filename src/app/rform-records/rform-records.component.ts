import { Component, OnInit } from '@angular/core';
import { RformDataService } from '../common/form.data.service';

@Component({
  selector: 'app-rform-records',
  templateUrl: './rform-records.component.html',
  styleUrls: ['./rform-records.component.css']
})
export class RformRecordsComponent implements OnInit {

  employee: any = {};
  empReibursementData: any;
  headerBarToggler: boolean;

  dtOptions: DataTables.Settings = {};

  constructor(private rformDataService: RformDataService) { }

  ngOnInit() {
    this.rformDataService.obj.subscribe(emp => {
      if (emp !== null && emp !== undefined)
        return this.employee = emp;
      else
        this.headerBarToggler = true;
    });
    if (this.employee.reimbursements !== undefined || this.employee.reimbursements !== null)
      this.setReimbursementData(this.employee.reimbursements);

    this.initAngularGrid();
  }

  setReimbursementData(empReibursementData: any) {
    this.empReibursementData = empReibursementData;
  }

  initAngularGrid() {
    this.dtOptions = {
      data: this.empReibursementData,
      columns: [{
        title: 'ID',
        data: 'billNumber'
      }, {
        title: 'Type',
        data: 'rType.typeName'
      }, {
        title: 'Amount',
        data: 'amount'
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };
  }

  someClickHandler(info: any) {
    console.log("You clicked on: " + info);
  }

}
