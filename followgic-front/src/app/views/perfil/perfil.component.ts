import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { MagoService } from 'src/app/services/mago.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
 perfilForm:FormGroup;
 modalidadesList: string[] = ['Cartomagia', 'Numismagia', 'Magia de Salón', 'Mentalismo', 'Escapismo'];
 datosUsuario:any = {}

  constructor(private magoService: MagoService, private router: Router) {
    this.getMago()

    this.perfilForm = new FormGroup({
      nombre: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      nombreArtistico: new FormControl(),
      modalidades: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      fotoPerfil: new FormControl(),
      paginaWeb: new FormControl(),
      descripcion: new FormControl()
   });
   }

  ngOnInit(): void {
  }

  
  getMago(){
       
        this.magoService.getUsuario().subscribe( res => {
           this.datosUsuario = res;
           console.log(res)
          },
          err => console.log(err)
        )
      }
    
}

