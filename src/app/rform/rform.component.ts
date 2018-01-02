import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RformService } from '../common/rform.service';
import { RformDataService } from '../common/form.data.service';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit {

  emp: any = {};
  isValidEmp: boolean = false;
  enableParticularsComponent: boolean = false;
  employeeId: number;

  ngOnInit() {
  }

  constructor(private http: Http, private rformService: RformService, private rformDataService: RformDataService) {
  }

  loadOnEmpIdChange(id: any) {
    if (id && id > 10000) {
      this.rformService.getEmployeeDataByEmpId(id).subscribe(data => {
        this.isValidEmp = true;
        this.enableParticularsComponent = true;
        this.rformDataService.setValue(data);
        return this.emp = data;
      });
    } else {
      this.emp = {};
      this.isValidEmp = false;
      this.enableParticularsComponent = false;
    }
  }

}
