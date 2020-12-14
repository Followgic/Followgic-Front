import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalidadesService {
  private URL = "http://localhost:8000"

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getModalidades(){
    return this.http.get<any>(`${this.URL}/user/modalidades/`);
  }
}
