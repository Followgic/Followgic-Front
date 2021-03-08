import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar-filtros',
  templateUrl: './toolbar-filtros.component.html',
  styleUrls: ['./toolbar-filtros.component.css']
})
export class ToolbarFiltrosComponent implements OnInit,OnDestroy  {
  mobileQuery: MediaQueryList;
  @Input()
  modalidades: any;
  @Input()
  filtros:boolean=true;
  
  @Output()
  modalidadesEmitter = new EventEmitter();

  private _mobileQueryListener: () => void;
  @ViewChild('snav', { static: false }) snav;
  @ViewChild('buscadorEtiquetas', { static: false }) buscadorEtiquetas;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public loginService: LoginService, private router: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 1820px)');
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

}

