import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
 perfilForm:FormGroup;
  modalidadesList: string[] = ['Cartomagia', 'Numismagia', 'Magia de Salón', 'Mentalismo', 'Escapismo'];
 
  constructor() {

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

}
