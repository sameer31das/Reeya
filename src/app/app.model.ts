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
    Id: number;
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




