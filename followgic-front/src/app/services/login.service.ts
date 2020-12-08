import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = "http://localhost:8000"
 
  token:any;

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private route: Router) { }


  login(mago){
   console.log(mago)
    return this.http.post<any>(this.URL + '/user/token/login', mago, {headers: this.httpHeaders});
  }

  
  logout(mago){
     return this.http.post<any>(this.URL + '/user/logout', mago, {headers: this.httpHeaders});
   }
 
  logueado(){
   return localStorage.getItem('auth_token')
  }
  

  
}
