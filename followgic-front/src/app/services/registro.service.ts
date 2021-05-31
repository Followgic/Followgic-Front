import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private URL = environment.url
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  registro(mago){
   
     return this.http.post<any>(this.URL + '/user/users/', mago, {headers: this.httpHeaders});
   }
}
