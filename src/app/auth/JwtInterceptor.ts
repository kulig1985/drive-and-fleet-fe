import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem("jwt");

    // Clone the request and add the authorization header
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
};
