import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RformService {

  constructor(private http: Http) { }

  getEmployeeDataByEmpId(id: number): Observable<any> {
    return this.http.get('/api/test?id=' + id).map(response => {
      return response.json();
    });
  }

  getRTypes(): Observable<any> {
    return this.http.get('/api/getRTypes').map(response=>{
      return response.json()
    });
  }

  getProjects(): Observable<any> {
    return this.http.get('/api/getProjects').map(response=>{
      return response.json()
    });
  }

}
