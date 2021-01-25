import { EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AvisoPreguntasComponent } from 'src/app/views/registro/aviso-preguntas/aviso-preguntas.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;
  @ViewChild('snav', { static: false }) snav;
  @ViewChild('notificacion', { static: false }) notificacion;

  abrirNotificaciones = new EventEmitter();
  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public loginService: LoginService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));



  logout() {
    let mago
    mago = localStorage.getItem('mago');
    this.loginService.logout(mago).subscribe(res => {
     
      localStorage.clear()
      this.router.navigate(['/login'])
    })


  }

  cargarNotificaciones() {
    this.notificacion.getPeticionesRecibidas()
    this.snav.toggle()
  }

  openDialog() {
    

    const dialogRef = this.dialog.open(AvisoPreguntasComponent,  {
      height: '250px',
      width: '400px',
      position: {top:'200px'},
      restoreFocus:false,
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log(`Dialog result: ${result}`);
    });
  }





}
