import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RformService {

  constructor(private http: Http) { }

  getEmployeeDataByEmpId(id: number): Observable<any> {
    return this.http.get('/api/test?id=' + id).map(response => {
      console.log('response= ' + response);
      return response.json();
    });
  }

}
