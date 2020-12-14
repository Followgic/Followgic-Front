import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  modalidadesList: string[] = ['Cartomagia', 'Numismagia', 'Magia de Salón', 'Mentalismo', 'Escapismo'];
  datosUsuario: any = {}
  modalidades: any = [];
  nombreModalidades:string =""; 

  constructor(private magoService: MagoService,private modalidadesService: ModalidadesService, private router: Router, public dialog: MatDialog,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'mago',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/mago.svg'));
    iconRegistry.addSvgIcon(
      'user',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/username2.svg'));
    iconRegistry.addSvgIcon(
      'web',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/web2.svg'));

    this.getModalidades()
    this.getMago()

    this.perfilForm = new FormGroup({
      nombre: new FormControl(),
      nombre_artistico: new FormControl(),
      modalidades: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      foto: new FormControl(),
      pagina_web: new FormControl(),
      descripcion: new FormControl(),
      username: new FormControl()
    });

  }


  openDialog() {
    const dialogRef = this.dialog.open(EditarPerfilComponent,{
      height: '450px',
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getModalidades()
      this.getMago()
      console.log(`Dialog result: ${result}`);
    });
  }



  ngOnInit(): void {
  }


  getMago() {
    this.magoService.getUsuario().subscribe(res => {
      this.datosUsuario = res;
    
      this.nombreModalidades =""
      this.pintarModalidades(this.datosUsuario.modalidades)
  
      this.perfilForm.setValue({
        nombre: this.datosUsuario.nombre,
        nombre_artistico: this.datosUsuario.nombre_artistico,
        telefono: this.datosUsuario.telefono,
        email: this.datosUsuario.email,
        foto: 'http://localhost:8000'+this.datosUsuario.foto,
        pagina_web: this.datosUsuario.pagina_web,
        descripcion: this.datosUsuario.descripcion,
        username: this.datosUsuario.username,
        modalidades:this.datosUsuario.modalidades

      })
      console.log(res)
    },
      err => console.log(err)
    )
  }


  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;

    })

  }

  pintarModalidades(idModalidades){
   
    idModalidades.forEach(idModalidad => {
      this.modalidades.forEach(modalidad => {
        if(modalidad.pk==idModalidad)
        this.nombreModalidades = this.nombreModalidades + modalidad.nombre + ", "
      });
    });
    this.nombreModalidades= this.nombreModalidades.slice(0,-2)
    this.nombreModalidades= this.nombreModalidades+ "."
  }
}

