import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidenav-mensajeria',
  templateUrl: './sidenav-mensajeria.component.html',
  styleUrls: ['./sidenav-mensajeria.component.css']
})
export class SidenavMensajeriaComponent implements OnInit {
  mobileQuery: MediaQueryList;
  @Input()
  modalidades: any;
  
  @Output()
  modalidadesEmitter = new EventEmitter();

  private _mobileQueryListener: () => void;
  @ViewChild('snav', { static: false }) snav;
  @ViewChild('buscadorEtiquetas', { static: false }) buscadorEtiquetas;
  @ViewChild('mensajesAmigos', { static: false }) mensajesAmigos;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public loginService: LoginService, private router: Router) {

    this.mobileQuery = media.matchMedia('max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
   }

  ngOnInit() {
   
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));


  ventanaLateral(){
    this.snav.toggle()
  }
  enviarModalidades(modalidadesFiltros){
  this.modalidadesEmitter.emit(modalidadesFiltros)
  }

  recargarMensajes(){
    this.mensajesAmigos.getMensajesRecibidos() 
  }

}
