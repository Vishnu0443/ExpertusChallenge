import { Component,Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable()
export class Appcomponentservices{
    constructor(private _http: HttpClient){

    }
    CallServicesMessage(data){
        var requestHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
        var Url="http://localhost:8080/saveMessage";
        return this._http.post<any>(Url, data, {headers:requestHeader}).pipe(map(dataapi=>{
          return dataapi;
        }));
    }
    CallServicesClientInfo(model){
        var requestHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
        var Url="http://localhost:8080/saveClientInfo";
        return this._http.post<any>(Url, model, {headers:requestHeader}).pipe(map(dataapi=>{
            return dataapi;
        }));
    }

}

