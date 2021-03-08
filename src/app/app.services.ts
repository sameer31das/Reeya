import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee, IState, ICity, IMode, IConsignmentList } from './app.model';


@Injectable()
export class ShareServices {
    constructor(private http: HttpClient) { }
    private hostUrl = 'http://cargo-xpert.in';
    private stateUrl: string = this.hostUrl + '/webapi/Territory/States';
    private cityUrl = '/assets/city.json';
    private modeUrl: string = this.hostUrl + '/webapi/Consignment/Modes';
    private submitUrl: string = this.hostUrl + '/api/Consignment';
    private consignmentListUrl = '/assets/ConsignmentList.json';
    // private consignmentListUrl: string = this.hostUrl + '/webapi/Consignment/Modes';

    getState(): Observable<IState> {
        return this.http.get<IState>(this.stateUrl);
    }
    getCity(): Observable<ICity> {
        return this.http.get<ICity>(this.cityUrl);
    }
    getConsignmentMode(): Observable<IMode> {
        return this.http.get<IMode>(this.modeUrl);
    }
    submitData(item): Observable<any> {
        return this.http.post<any>(this.submitUrl, item);
    }
    getConsignmentList(): Observable<IConsignmentList>{
        return this.http.get<IConsignmentList>(this.consignmentListUrl);
    }
    getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
    }
