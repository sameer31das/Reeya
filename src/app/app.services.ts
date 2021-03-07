import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEmployee,IState,ICity, IMode } from "./app.model";


@Injectable()
export class ShareServices {
    constructor(private http: HttpClient) { }
    private hostUrl: string = "http://cargo-xpert.in"
    private state_url: string = this.hostUrl+"/webapi/Territory/States"
    private city_url: string = "/assets/city.json"
    private mode_url: string = this.hostUrl+"/webapi/Consignment/Modes"
   
    getState(): Observable<IState> {
        return this.http.get<IState>(this.state_url)
    }
    getCity(): Observable<ICity> {
        return this.http.get<ICity>(this.city_url)
    }
    getConsignmentMode(): Observable<IMode> {
        return this.http.get<IMode>(this.mode_url)
    }
    }