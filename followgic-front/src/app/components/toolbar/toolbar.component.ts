import { EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit,OnDestroy  {
  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;
  @ViewChild('snav', { static: false }) snav;
  @ViewChild('notificacion', { static: false }) notificacion;
  
  abrirNotificaciones = new EventEmitter();
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public loginService: LoginService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));



  logout(){
    let mago
    mago=localStorage.getItem('mago');
    this.loginService.logout(mago).subscribe(res =>{
      console.log(res)
      localStorage.clear()
      this.router.navigate(['/login'])
    })

    
  }

  cargarNotificaciones(){
    this.notificacion.getPeticionesRecibidas()
    this.snav.toggle()
  }




}
