export interface IEmployee{
    id: number;
    name: string;
}

export interface IState{
    code: number;
    reason: string;
    result: IStateDetail[];

}
export interface IStateDetail{
    id: number;
    name: string;
    type: string;
    code: number;
    zone: string;

}
export interface ICity{
    statusCode: number;
    message: string;
    result: ICityDetail[];
}
export interface IMode{
    statusCode: number;
    message: string;
    result: string[];
}
export interface ICityDetail{
    name: string;
    state: IStateDetail[];
    pinCode: string;
    location: ILocationDetail[];
    customerCodePrefix: string;
    id: number;
    createdOn: string;
    modifiedOn: string;
    createdBy: string;
    modifiedBy: string;
}
export interface ILocationDetail{
    longitude: string;
    latitude: string;
}
export interface IConsignmentList{
    statusCode: number;
    message: string;
    result: IConsignmentListDetail[];
}
export interface IConsignmentListDetail{
    id: number;
    trackingId: string;
    pickupDate: string;
    deliveryDate: string;
    customerName: string;
    fromCity: string;
    toCity: string;
    status: number;
    photoUrl: string;
    ewayBillUrl: string;
}

export class FileToUpload {
    fileName: string = "";
    fileSize: number = 0;
    fileType: string = "";
    lastModifiedTime: number = 0;
    lastModifiedDate: Date = null;
    fileAsBase64: string = "";
}


