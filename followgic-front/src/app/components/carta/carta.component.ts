import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';

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
  constructor(private peticionService: PeticionService, private magoService: MagoService,private router: Router) { }

  ngOnInit() {
console.log(this.peticionesPendientes)
    
  }

  crearPeticionAmistad(id){
    this.peticionService.crearPeticionAmistad(id).subscribe(res=>
      {
          console.log(res)
          
      },
      err=> console.log(err)
      )
  }


  irPerfil(idAmigo){
          this.router.navigate(["/perfil",{id:idAmigo}],)
  }




}
