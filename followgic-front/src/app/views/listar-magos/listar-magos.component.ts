import { Component, OnInit } from '@angular/core';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';


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
  constructor(private magoService: MagoService, private peticionService: PeticionService) {
    this.getAllMagos()
    this.getAllAmigos()
    this.getPeticionesPendientes()
   }

  ngOnInit(): void {
  }


  getAllMagos() {
    this.magoService.getAllMagos().subscribe(res => {
      this.magos = res
      this.magos.forEach((mago, i) => {
        this.magos[i].foto = "http://localhost:8000" + mago.foto  
      });
      
      
    })
  }

  getAllAmigos(){
    this.magoService.getAllAmigos().subscribe(res =>{
      this.amigos=res

    })
  }

  getPeticionesPendientes(){
    this.peticionService.peticionesPendientes().subscribe(res =>{
      this.peticionesPendientes=res
      this.peticionesPendientes.forEach(peticion => {
        this.pendientes.push(peticion.pk)
        
      });
    })
  }

}
