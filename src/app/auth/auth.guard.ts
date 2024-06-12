import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import jwt_decode from "jwt-decode";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateJwt().pipe(
      map((validateResult: any) => {
        if (validateResult.statusCode == 200) {

            let decoded = jwt_decode(authService.showJwt()!);
            let jwtObjectParsed = JSON.parse(JSON.stringify(decoded))

            if (route.url.toString() === 'admin') {
                return jwtObjectParsed.driverType == 'ADMIN';
            }
            else {
                return true;
            }

        } else {
          localStorage.removeItem('jwt');
          router.navigate(['/login']).then(r => {});
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/login']).then(r => {});
        return of(false);
      })
  )
};
