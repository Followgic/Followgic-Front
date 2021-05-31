import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { AvisoCancelarPeticionComponent } from './aviso-cancelar-peticion/aviso-cancelar-peticion.component';
import { AvisoPeticionComponent } from './aviso-peticion/aviso-peticion.component';
import {map, startWith} from 'rxjs/operators';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { LoginService } from 'src/app/services/login.service';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-listar-magos',
  templateUrl: './listar-magos.component.html',
  styleUrls: ['./listar-magos.component.css']
})

export class ListarMagosComponent implements OnInit {
  magos: any = []
  copiaMagos : any =[]
  amigos:any = []
  peticionesPendientes:any=[]
  pendientes:any=[]
  magoForm:FormGroup;
  buscarMagos:any;
  filtro_valor:any[]=['']
  filtrarNombre:any=''
  filtrarModalidad:any[]=[]
  filtros:boolean=false
  modalidades:any[]=[]
  notifications:any[]=[]
  listarMagos = true
  localizacion=[]
  timerStop:any


  @ViewChild('ventanaLateral', { static: false }) ventanaLateral;
  constructor(public dialog: MatDialog,private loginService: LoginService,public localizacionService: LocalizacionService,private magoService: MagoService, private peticionService: PeticionService, private modalidadesService: ModalidadesService) {
    this.peticionService.peticiones$.subscribe(res => {
      this.pendientes = res.map(peticion => peticion.pk)
    })
 

    this.magoService.recargaAmigos$.subscribe(res => {
      
      this.amigos = res.map(amigo=> amigo.pk)
    })

      this.localizacionService.localizacionFiltrada$.subscribe(res => {
        this.filtrarMagos(null,null,true)

        this.magos = this.copiaMagos.filter(mago => mago.localizacion.latitud == res[1]&& mago.localizacion.longitud == res[0])
      
      })
    this.getModalidades()
    this.getAllMagos()
    this.getAllAmigos()
    this.getPeticionesPendientes()
  
    this.magoForm = new FormGroup({
      nombre: new FormControl(''),
      
     
    })
    
    
    
    
   }

   

   openDialog(nombreMago) {
     if(nombreMago){
    const dialogRef = this.dialog.open(AvisoPeticionComponent, {
      height: '200px',
      width: '300px',
      data: { nombre: nombreMago },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllAmigos()  
    this.getPeticionesPendientes()
      console.log(`Dialog result: ${result}`);
    });
  }
  }

  ngOnInit() {
    this.modalidadesService.modalidadesControl$.subscribe(res =>{

      this.filtrarMagos(null,res)
    
    
      })
      
    
 
   
  }



  refrescarPagina(usuario){
    if(usuario){
      const dialogRef = this.dialog.open(AvisoCancelarPeticionComponent, {
        height: '210px',
        width: '300px',
        data:usuario ,
        autoFocus: false 
      });
  
      dialogRef.afterClosed().subscribe(result => {
      this.getAllAmigos()
      this.getPeticionesPendientes()
        console.log(`Dialog result: ${result}`);
      });
    

    }
  }


  getAllMagos() {
    this.magoService.getAllMagos().subscribe(res => {
        this.magos = res
      this.magos =this.magos.map(mago=> {return{ pk: mago.pk , foto: mago.foto, nombre: mago.nombre, nombre_artistico: mago.nombre_artistico, modalidades: mago.modalidades,localizacion: this.añadirLocalizacion(mago.localizacion) }})
    /*   this.magos.forEach((mago, i) => {
        this.magos[i].foto = environment.url + mago.foto  
      });
 */
    
      this.copiaMagos = Object.assign([] , this.magos)
      var GeoJSON = require('geojson');
      var geoJson = GeoJSON.parse(this.magos.map(mago => mago.localizacion), {Point: ['latitud', 'longitud']});
      this.localizacionService.localizacionUsuarios$.emit(geoJson)
    })
  }
  añadirLocalizacion(localizacion){
    localizacion.lat = localizacion.latitud
    localizacion.long = localizacion.longitud
    return localizacion
  }

  cargarMagos(event){
    if(event == true){
      this.magos = Object.assign([] , this.copiaMagos)
      var GeoJSON = require('geojson');
      var geoJson = GeoJSON.parse(this.magos.map(mago => mago.localizacion), {Point: ['latitud', 'longitud']});
      this.localizacionService.localizacionUsuarios$.emit(geoJson)
    }
  }

  getAllAmigos(){
    this.magoService.getAllAmigos().subscribe(res =>{
      this.amigos=res
      this.amigos=this.amigos.map(amigo=>
     amigo.pk )

    })
  }
  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;
      this.modalidadesService.modalidades$.emit(this.modalidades)
    })

  }


  getPeticionesPendientes(){
    this.peticionService.peticionesPendientes().subscribe(res =>{
      this.peticionesPendientes=res
        this.pendientes=this.peticionesPendientes.map(peticion=>
          peticion.pk )

    })
  }

  buscarMagosNombre(){
    this.buscarMagos= {nombre:this.magoForm.controls.nombre.value, modalidades:[]}
    this.magoService.getMagosPorNombreYModalidad(this.buscarMagos).subscribe( res=>{
      this.magos = res

      }
      
    )
  }

  filtrarMagos(nombre?:String, modalidadesControl?:any[], filtro_Valor?){
    if(modalidadesControl) this.filtrarModalidad = modalidadesControl
    if(nombre!=null){
      this.filtrarNombre = nombre
      
    if(this.timerStop)
    clearTimeout(this.timerStop)	

  this.timerStop = setTimeout(()=>{

    if(filtro_Valor){
      this.filtro_valor=null
    }else{
      this.filtro_valor=[this.filtrarNombre,this.filtrarModalidad]
    }
  }, 500)

    }else{
      

    if(filtro_Valor){
      this.filtro_valor=null
    }else{
      this.filtro_valor=[this.filtrarNombre,this.filtrarModalidad]
    }

    }

  

  

    



   
  }
  activarFiltros(){
    this.filtros=!this.filtros
  }

  abrirFiltros(){
    this.ventanaLateral.ventanaLateral()
  }

 






}
