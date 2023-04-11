import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
/* If there's a token in local storage, add it to the request headers, otherwise, just pass the request
through. */
export class AuthInterceptorService implements HttpInterceptor {
 /* It's intercepting the request and adding the token to the header. */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ):/* It's intercepting the request and adding the token to the header. */
   Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
  
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });
    /* It's passing the request through to the next handler. */
      return next.handle(clonedRequest);
    } /* It's passing the request through to the next handler. */
    else {
      return next.handle(req);
    }
  }
}