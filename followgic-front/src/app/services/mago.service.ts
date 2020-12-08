import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MagoService implements HttpInterceptor {

  private URL = "http://localhost:8000"
  
  private httpHeaders = new HttpHeaders({
   'Content-Type': 'application/json'
 });
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');
if (!token) {
      return next.handle(req);
    }
const headers = req.clone({
      headers: req.headers.set('Authorization', `Token ${token}`)
    });
return next.handle(headers);
  }


  constructor(private http: HttpClient, private route: Router) { }

getUsuario(){
  console.log(this.httpHeaders)
  return this.http.get<any>(`${this.URL}/user/miPerfil/`,{headers: this.httpHeaders});
}




}
 

