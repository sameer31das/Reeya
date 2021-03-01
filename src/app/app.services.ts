import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEmployee } from "./app.model";

@Injectable()
export class ShareServices {
    constructor(private http: HttpClient) { }
    private _url: string = "/assets/employee.json"
    getEmpl(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(this._url)
    }
}