import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(driverPass: string, driverName: string) {

    const authCredential = {
      driverName: driverName,
      driverPass: driverPass
    };

    return this.httpClient.post(environment.signIn, authCredential);
  }

  validateJwt() : Observable<any> {
    console.log('validate jwt invoked!');
    return this.httpClient.get(environment.validateJwt, {headers : { "Authorization": "Bearer " + localStorage.getItem("jwt"),
        "accept" : "*/*"}});

  }
  isLoggedIn(): Observable<boolean> {

    console.log('isLoggedIn invoked..');
    let jwt= localStorage.getItem("jwt");

    if(jwt==undefined || jwt=='' || jwt==null){
      console.log("LoginService isLoggedIn token and username NOT FOUND in local storage!");
      return of(false);

    }
    else {
      console.log("LoginService isLoggedIn token and username FOUND in local storage! Start validate JWT!");

      return this.validateJwt().pipe(
          map((validateResult: any) => {
            console.log('jwt is validation result: ', validateResult)
            return validateResult.statusCode == 200;
          }),
          catchError(() => {
            return of(false);

          })
      )

    }
  }

  showJwt() {
    return localStorage.getItem("jwt");
  }

  isUserAdmin() {
    let decoded = jwt_decode(this.showJwt()!);
    let jwtObjectParsed = JSON.parse(JSON.stringify(decoded))

    return jwtObjectParsed.driverType == 'ADMIN';
  }


}
