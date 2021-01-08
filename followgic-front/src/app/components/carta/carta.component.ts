import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { AvisoPeticionComponent } from 'src/app/views/listar-magos/aviso-peticion/aviso-peticion.component';
import { ListarMagosComponent } from 'src/app/views/listar-magos/listar-magos.component';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  @Input()
  usuario: any;
  @Input()
  amigos: any;
  @Input()
  peticionesPendientes: any;
  @Input()
  paginaAmigo:any;
  
  @Output()
  abrirPopUp = new EventEmitter();
  @Output()
  abrirEliminar = new EventEmitter();
  @Output()
  refrecarPagina = new EventEmitter();
  

  constructor( private peticionService: PeticionService, private magoService: MagoService,private router: Router) { 
    this.comprobarPeticionesPendientes()
  
  
  }

  ngOnInit() {
console.log(this.peticionesPendientes)

    
  }


  crearPeticionAmistad(id,nombre){
    this.peticionService.crearPeticionAmistad(id).subscribe(res=>
      {

        this.abrirPopUp.emit(nombre)
          console.log(res)
          
      },
      err=> console.log(err)
      )
  }

  cancelarPeticion(id, nombre){
    let usuario ={id:id,nombre:nombre}
    this.refrecarPagina.emit(usuario)
  }

  

  eliminarAmigo(id, nombre){
    let usuario ={id:id,nombre:nombre}
   
      this.abrirEliminar.emit(usuario)
     
  }


  irPerfil(idAmigo){
          this.router.navigate(["/perfil",{id:idAmigo}],)
  }

  comprobarPeticionesPendientes(){
    if(!this.peticionesPendientes){
      this.peticionesPendientes=[]
    }
  }




}
