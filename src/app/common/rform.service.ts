import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RformService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getEmployeeDataByEmpId(id: number): Observable<any> {
    return this.http.get('/api/getEmployeeById?id=' + id).map(response => response.json());
  }

  getRTypes(): Observable<any> {
    return this.http.get('/api/getRTypes').map(response => {
      return response.json()
    });
  }

  getProjects(): Observable<any> {
    return this.http.get('/api/getProjects').map(response => {
      return response.json()
    });
  }

  storeReimbursements(empObj: any): Promise<any> {
    return this.http.post('/api/saveReimbursements', JSON.stringify(empObj), {headers: this.headers})
            .toPromise()
            .then(response => {console.log(response); return response.json()})
            .catch(this.handleErrors)
  }

/* saveBook(book: Book): Promise<Book[]> {
    return this.http.post(this.saveBookSURL, JSON.stringify(book), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Book[])
      .catch(this.handleError);
  } */

  handleErrors() {
    console.log("error occurred while saving")
  }

}
