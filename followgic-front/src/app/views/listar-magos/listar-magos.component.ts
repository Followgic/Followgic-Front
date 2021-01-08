import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { AvisoCancelarPeticionComponent } from './aviso-cancelar-peticion/aviso-cancelar-peticion.component';
import { AvisoPeticionComponent } from './aviso-peticion/aviso-peticion.component';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-listar-magos',
  templateUrl: './listar-magos.component.html',
  styleUrls: ['./listar-magos.component.css']
})

export class ListarMagosComponent implements OnInit {
  magos: any = []
  amigos:any = []
  peticionesPendientes:any=[]
  pendientes:any=[]
  magoForm:FormGroup;
  buscarMagos:any;
  filtro_valor:any[]=['']
  filtro_modalidad = '8'
  @ViewChild('modalidadesFiltradas',{ static: false }) modalidadesFiltradas;
  constructor(public dialog: MatDialog,private magoService: MagoService, private peticionService: PeticionService) {
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
      this.magos =this.magos.map(mago=> {return{ pk: mago.pk , foto: "http://localhost:8000"
        + mago.foto, nombre: mago.nombre, nombre_artistico: mago.nombre_artistico, modalidades: mago.modalidades }})
    /*   this.magos.forEach((mago, i) => {
        this.magos[i].foto = "http://localhost:8000" + mago.foto  
      });
 */
    })
  }

  getAllAmigos(){
    this.magoService.getAllAmigos().subscribe(res =>{
      this.amigos=res
      this.amigos=this.amigos.map(amigo=>
     amigo.pk )

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
      
      this.magos =this.magos.map(mago=> {return{ pk: mago.pk , foto: "http://localhost:8000"
        + mago.foto, nombre: mago.nombre, nombre_artistico: mago.nombre_artistico }})

      }
      
    )
  }

  filtrarMagos(nombre?:String, modalidadesControl?:any[]){
    let modalidades 
    
     modalidades = this.modalidadesFiltradas.buscarModalidades
    

    this.filtro_valor=[nombre,modalidades]
   
  }





}
