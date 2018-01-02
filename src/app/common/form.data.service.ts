import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RformDataService {

    private src = new BehaviorSubject<any>(Object);
    public obj = this.src.asObservable();

    constructor() {
    }

    setValue(value: any) {
        this.src.next(value);
    }

}