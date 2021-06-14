import { EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AvisoPreguntasComponent } from 'src/app/views/registro/aviso-preguntas/aviso-preguntas.component';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  peticionesRecibidas: any = 0;
  mensajesRecibidos: any = 0;
  comentariosNoLeidos = 0
  invitacionesRecibidas=0;


  private _mobileQueryListener: () => void;
  @ViewChild('snav', { static: false }) snav;
  @ViewChild('notificacion', { static: false }) notificacion;



  abrirNotificaciones = new EventEmitter();
  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
     public loginService: LoginService, public peticionService: PeticionService, public mensajeService: MensajeService, private eventoService: EventoService, private router: Router) {
    if(this.loginService.logueado()){
    this.getPeticionesRecibidas()
    this.getConversancion()
  }
    this.mobileQuery = media.matchMedia('(max-width: 100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.peticionService.peticionesRecibidas$.subscribe(res => {
      this.peticionesRecibidas = res.length
    })
    this.eventoService.recargarInvitaciones$.subscribe(res => {
      this.invitacionesRecibidas = res
    })


    this.mensajeService.recargarMenssajesNoLeidos$.subscribe(res => {
      this.mensajesRecibidos = res.length
    })

    this.eventoService.comentariosSinLeer$.subscribe(res => {
      if(res==0){
        this.comentariosNoLeidos=0  
      }else{
      this.comentariosNoLeidos= this.comentariosNoLeidos + 1

      }
    })
  }



  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));



  logout() {
    let mago
    this.snav.close()
    mago = localStorage.getItem('mago');
   
    this.loginService.logout(mago).subscribe(res => {

      localStorage.clear()
      this.router.navigate(['/login'])
    },error =>{
      localStorage.clear()
    })


  }
  nuevaPeticiones() {
    this.notificacion.getPeticionesRecibidas()
  }

  cargarNotificaciones() {
    this.notificacion.getPeticionesRecibidas()
    this.mensajeService.varita$.emit({idUsuario:null,dentro:false})
    this.mensajeService.cerrarVistaChat$.emit(true)
    this.mensajeService.recargarMensaje$.emit([])
    this.snav.toggle()
  }

  openDialog() {


    const dialogRef = this.dialog.open(AvisoPreguntasComponent, {
      height: '250px',
      width: '400px',
      position: { top: '200px' },
      restoreFocus: false,
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(`Dialog result: ${result}`);
    });
  }

  getConversancion() {
    this.mensajeService.getMensajesNoLeidos().subscribe(res => {
      this.mensajesRecibidos = res.length

    })
  }

  getPeticionesRecibidas() {
    this.peticionService.peticionesRecibidas().subscribe(res => {
      this.peticionesRecibidas = res.length

    })
  }



}
