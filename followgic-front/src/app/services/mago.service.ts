import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MagoService implements HttpInterceptor {

  private URL = "http://localhost:8000"

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private httpHeader = new HttpHeaders({
    
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
  busqueda:any
  busqueda$ = new EventEmitter()
  amigo$ = new EventEmitter()
  constructor(private http: HttpClient, private route: Router) {
    
   }

  getUsuario() {

    return this.http.get<any>(`${this.URL}/user/miPerfil/`, { headers: this.httpHeaders });
  }

  setBusqueda(busqueda):void{
    this.busqueda=busqueda
   
  }

  editUsuario(mago){
    return this.http.put<any>(`${this.URL}/user/users/me/`, mago );
  }

  editImagen(imagen){
    return this.http.post<any>(`${this.URL}/user/setImagen/`, imagen);
  }

  getAllMagos() {

    return this.http.get<any>(`${this.URL}/user/listadoMagos/`, { headers: this.httpHeaders })
  }

  getAllAmigos() {

    return this.http.get<any>(`${this.URL}/user/amigos/`, { headers: this.httpHeaders });
  }

  getPerfilAmigo(id) {

    return this.http.get<any>(`${this.URL}/user/verPerfil/${id}`, { headers: this.httpHeaders });
  }

  getMagosPorNombreYModalidad(peticion){

    return this.http.post<any>(`${this.URL}/user/buscarMagos/`, peticion,{ headers: this.httpHeaders });
    
  }

  eliminarAmigo(id){

    return this.http.get<any>(`${this.URL}/peticiones/eliminarAmigo/${id}`, { headers: this.httpHeaders });
    
  }
  getYo(cb){
  let pk 
    this.getUsuario().subscribe( res => {
      pk = res.pk
      if (cb) {

        cb(pk)
        
      }
     
    })
    
  
  }



 
  

  





}


