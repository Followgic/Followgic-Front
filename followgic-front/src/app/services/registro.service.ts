import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private URL = "http://localhost:8000"
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  registro(mago){
    console.log(mago)
     return this.http.post<any>(this.URL + '/user/users/', mago, {headers: this.httpHeaders});
   }
}
