import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = environment.url
 
  token:any;

  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });




  constructor(private http: HttpClient, private route: Router) { }


  login(mago){
    return this.http.post<any>(this.URL + '/user/token/login', mago, {headers: this.httpHeaders});
  }

  
  logout(mago){
     return this.http.post<any>(this.URL + '/user/token/logout/', mago, {headers: this.httpHeadersToken});
   }
 
  logueado(){
   return localStorage.getItem('auth_token')
  }

  getUsername(){
  
    return localStorage.getItem('username')
  
   }
  

  
}
