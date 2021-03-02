import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEmployee,IState,ICity } from "./app.model";


@Injectable()
export class ShareServices {
    constructor(private http: HttpClient) { }
    private _url: string = "/assets/employee.json"
    private state_url: string = "/assets/state.json"
    private city_url: string = "/assets/city.json"
    getEmpl(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(this._url)
    }
    getState(): Observable<IState> {
        return this.http.get<IState>(this.state_url)
    }
    getCity(): Observable<ICity> {
        return this.http.get<ICity>(this.city_url)
    }
    }