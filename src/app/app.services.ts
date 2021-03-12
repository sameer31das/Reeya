import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee, IState, ICity, IMode, IConsignmentList, IEmployees, IAssignEmployeeParams, IStatusParams } from './app.model';


@Injectable()
export class ShareServices {
    constructor(private http: HttpClient) { }
    private hostUrl = 'http://cargo-xpert.in';
    private stateUrl: string = this.hostUrl + '/webapi/Territory/States';
    private cityUrl = this.hostUrl + '/webapi/territory/cities/all';
    private modeUrl: string = this.hostUrl + '/webapi/Consignment/Modes';
    private submitUrl: string = this.hostUrl + '/api/Consignment';
    private consignmentListUrl = '/assets/ConsignmentList.json';
    // private consignmentListUrl: string = this.hostUrl + '/webapi/Consignment/Modes';
    private document_url: string = this.hostUrl + "/webapi/Consignment/Document";
    private track_url:string=this.hostUrl+"/webapi/Consignment/";
    private employeeList_url:string=this.hostUrl+"/webapi/Consignment/Employees";
    private employeeAssign_url:string=this.hostUrl+"/webapi/Consignment/Assign";

    getState(): Observable<IState> {
        return this.http.get<IState>(this.stateUrl);
    }
    getCity(): Observable<ICity> {
        return this.http.get<ICity>(this.cityUrl);
    }
    getConsignmentMode(): Observable<IMode> {
        return this.http.get<IMode>(this.modeUrl);
    }
    submitData(item: any): Observable<any> {
        return this.http.post<any>(this.submitUrl, item);
    }
    getConsignmentList(): Observable<IConsignmentList> {
        return this.http.get<IConsignmentList>(this.consignmentListUrl);
    }
    uploadDocument(fileObject): Observable<any> {
        const formData = new FormData();
        formData.append('file', fileObject);
        return this.http.post<any>(this.document_url, formData)
    }
    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
            },
                err => {
                    reject(err);
                });
        });
    }
    getDocument(document:any): Observable<any> {
        return this.http.get<any>(this.document_url+"/"+document);
    }
    getTrackHistory(trackId:number){
        return this.http.get<any>(this.track_url+trackId+"/Track/History");
    }
    updateEwaybill(id: number,fileObject): Observable<any> {
        const formData = new FormData();
        formData.append('file', fileObject);
        return this.http.post<any>(this.hostUrl+"/webapi/Consignment/"+id+"Document", formData);
    }
    updateStatus(id: number,payloadStatus: IStatusParams): Observable<any> {
        return this.http.post<any>(this.hostUrl+"/webapi/Consignment/"+id+"Status", payloadStatus);
    }
    rescheduledDate(id: number,payloadReschedule: any){
        return this.http.patch<any>(this.hostUrl+"/webapi/Consignment/"+id+"Status", payloadReschedule);
    }
    getEmployee(){
        return this.http.get<IEmployees>(this.employeeList_url);
    }
    assignEmployee(jsonItem: IAssignEmployeeParams){
        return this.http.post<any>(this.employeeAssign_url,jsonItem);
    }

}
