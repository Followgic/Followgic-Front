import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
export interface Modalidad {
  pk: number;
  nombre: String;
}
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})

export class EditarPerfilComponent implements OnInit {
  perfilForm: FormGroup;
  modalidades: any;
  modalidadesForm: any;
  datosUsuario: any = {}
  preImagen: any;
  imagen: any;
  constructor(private magoService: MagoService, private modalidadesService: ModalidadesService, public dialog: MatDialog) {
    this.getMago()
    this.getModalidades()
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

  ngOnInit(): void {
  }

  getMago() {
    this.magoService.getUsuario().subscribe(res => {
      this.datosUsuario = res;
      console.log(this.datosUsuario)
      this.perfilForm.setValue({
        nombre: this.datosUsuario.nombre,
        nombre_artistico: this.datosUsuario.nombre_artistico,
        telefono: this.datosUsuario.telefono,
        email: this.datosUsuario.email,
        foto: this.datosUsuario.foto,
        pagina_web: this.datosUsuario.pagina_web,
        descripcion: this.datosUsuario.descripcion,
        username: this.datosUsuario.username,
        modalidades: this.datosUsuario.modalidades
      })
      this.preImagen = 'http://localhost:8000' + this.perfilForm.value.foto


      console.log(res)
    },
      err => console.log(err)
    )
  }

  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;
      console.log(res)
    })

  }


  save() {
    const formData = new FormData();
    delete this.perfilForm.value.foto
    this.magoService.editUsuario(this.perfilForm.value).subscribe(res => {
      if (this.imagen) {
        this.saveImangen()
      }
  this.dialog.closeAll()
      console.log(res)
      this.getMago()

    })

  }
  saveImangen() {
    const formData = new FormData();
    formData.append('foto', this.imagen);
    this.magoService.editImagen(formData).subscribe(res => {
      console.log(res)
      this.getMago()
    })

  }

  onChangeImagen(files: FileList) {
    let fichero = files.item(0)
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      let data = fileReader.result
      this.preImagen = data.toString()
    }
    fileReader.readAsDataURL(fichero)
      this.imagen = fichero;
 



  }


}
