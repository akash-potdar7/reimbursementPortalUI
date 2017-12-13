import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RformService } from '../common/rform.service';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit {

  emp: any = {};
  isValidEmp: boolean = false;
  enableParticularsComponent: boolean = false;

  ngOnInit() {
  }

  constructor(private http: Http, private rformService: RformService) {
  }

  loadOnEmpIdChange(id: any) {
    console.log('RformComponent.doSomething() id= ' + id);
    if (id && id > 10000) {
      this.rformService.getEmployeeDataByEmpId(id).subscribe(data => {
        console.log('data from service= ' + data);
        this.isValidEmp = true;
        return this.emp = data;
      });
    } else {
      this.emp = {};
      this.isValidEmp = false;
    }
  }

  goToForms() {
    this.enableParticularsComponent = true;
  }

}
