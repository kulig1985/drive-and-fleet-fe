import { Injectable } from '@angular/core';
import {cilArrowLeft, cilArrowThickFromRight} from "@coreui/icons";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewRideService {

  icons = { cilArrowLeft, cilArrowThickFromRight};
  constructor(private httpClient: HttpClient) { }

  downloadPicture(fileId: number): Observable<Blob>{
    let params = new HttpParams().set('fileId', fileId);
    return this.httpClient.get(environment.downloadPicture, {params: params, responseType: 'blob' })
  }
}
