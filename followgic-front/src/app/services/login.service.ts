import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = "http://localhost:8000"

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private route: Router) { }


  login(mago){
    console.log(mago);
    return this.http.post<any>(this.URL + '/login', mago, {headers: this.httpHeaders});
  }
}
