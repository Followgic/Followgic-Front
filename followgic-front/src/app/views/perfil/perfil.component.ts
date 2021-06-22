import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { EditarModalidadesComponent } from './editar-modalidades/editar-modalidades.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { environment } from 'src/environments/environment';

export interface Modalidad {
  pk: number;
  nombre: String;
}
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
  copiaModalidades:any =[]
  nombreModalidades: string = "";
  idAmigo: any;
  errorAmigo: boolean =true;
  misModalidades:any = []
  numeroAmigos:any;
  misEventos:any = []

  urlImagen = environment.url_img


  constructor( private eventoService: EventoService,private route: ActivatedRoute, private magoService: MagoService, private modalidadesService: ModalidadesService, private router: Router, public dialog: MatDialog,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'mago',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/mago.svg'));
    


    this.getModalidades()
    this.obtenerIdUrl()
    this.getAllAmigos()

    this.magoService.recargarPerfil$.subscribe(()=>{
      this.errorAmigo=false
      this.idAmigo = false
      this.getMago()
      this.getMisEventos()
    }
    
    )


    this.perfilForm = new FormGroup({
      nombre: new FormControl(""),
      nombre_artistico: new FormControl(""),
      modalidades: new FormControl(""),
      telefono: new FormControl(""),
      email: new FormControl(""),
      foto: new FormControl(""),
      pagina_web: new FormControl(""),
      descripcion: new FormControl(""),
      username: new FormControl("")
    });

  }


  openDialog() {
    const dialogRef = this.dialog.open(EditarPerfilComponent, {
      height: '450px',
      width: '1000px',
      autoFocus: false ,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getModalidades()
      this.getMago()
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogModalidad(modalidades) {
    if(modalidades){
    const dialogRef = this.dialog.open(EditarModalidadesComponent, {
      height: '460px',
      width: '550px',
      data:{ modalidades:modalidades, misModalidades:this.misModalidades, mago:this.perfilForm.value},
      autoFocus: false ,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getModalidades()
      this.getMago()
      console.log(`Dialog result: ${result}`);
    });
  }
  }



  ngOnInit() {
  }


  obtenerIdUrl() {
    if (this.route.snapshot.params.id) {

      this.idAmigo = this.route.snapshot.params.id
      this.getEventosPorIdAmigo(this.idAmigo)

      this.magoService.getAllAmigos().subscribe( res =>{
        res=res.map(amigo=>amigo.pk)
        if(res.indexOf(Number(this.idAmigo)) >=0){
          this.getMago(this.idAmigo)
          this.errorAmigo=false
        }else{
          this.router.navigate(["/error-amigo"])
        }
      })
    }else {
      this.errorAmigo=false
      this.getMago()
      this.getMisEventos()
     
    }

  }



  getMago(id?) {

    this.datosUsuario.modalidades = []
    if (!id) {
      this.magoService.getUsuario().subscribe(res => {
        this.datosUsuario = res;

      if(this.copiaModalidades.length == 0 ||JSON.stringify(this.copiaModalidades) !== JSON.stringify(this.datosUsuario.modalidades)){
        this.nombreModalidades = ""
        this.pintarModalidades(this.datosUsuario.modalidades)
        }
        this.perfilForm.setValue({
          nombre: this.datosUsuario.nombre,
          nombre_artistico: this.datosUsuario.nombre_artistico,
          telefono: this.datosUsuario.telefono,
          email: this.datosUsuario.email,
          foto: this.urlImagen + this.datosUsuario.foto,
          pagina_web: this.datosUsuario.pagina_web,
          descripcion: this.datosUsuario.descripcion,
          username: this.datosUsuario.username,
          modalidades: this.datosUsuario.modalidades

        })
     
      },
        err => console.log(err)
      )
    } else {
      this.magoService.getPerfilAmigo(id).subscribe(res => {
     
        this.datosUsuario = res;

        if(this.copiaModalidades.length == 0 ||JSON.stringify(this.copiaModalidades) !== JSON.stringify(this.datosUsuario.modalidades)){
        this.nombreModalidades = ""
        this.pintarModalidades(this.datosUsuario.modalidades)
        }

        this.perfilForm.setValue({
          nombre: this.datosUsuario.nombre,
          nombre_artistico: this.datosUsuario.nombre_artistico,
          telefono: this.datosUsuario.telefono,
          email: this.datosUsuario.email,
          foto: this.urlImagen+ this.datosUsuario.foto,
          pagina_web: this.datosUsuario.pagina_web,
          descripcion: this.datosUsuario.descripcion,
          modalidades: this.datosUsuario.modalidades,
          username: ""

        })
      
      },
        err => console.log(err)
      )
    }

  }


  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;

    })

  }

  pintarModalidades(idModalidades) {
    this.misModalidades=[]
    this.copiaModalidades= idModalidades
    this.misModalidades = this.modalidades.filter(modalidad => idModalidades.includes(modalidad.pk))
      // idModalidades.forEach((idModalidad, i) => {
    //   this.modalidades.forEach(modalidad => {

    //     if (modalidad.pk == idModalidad)
    //     this.misModalidades.push(modalidad)
         
    //   });
    // });
  }

  getAllAmigos(){
    this.magoService.getAllAmigos().subscribe(res =>{
      this.numeroAmigos =res.length
 
   
    })
  }


  drop(event: CdkDragDrop<Modalidad[]>) {
    moveItemInArray(this.misModalidades.nombre, event.previousIndex, event.currentIndex);
  }


  //Metodos para mis eventos
  getMisEventos(){
    this.eventoService.getMisEventos().subscribe( res => {
      this.misEventos = res
    })
  }
  getEventosPorIdAmigo(idAmigo){
    this.eventoService.getEventosPorIdMago(idAmigo).subscribe( res => {
      this.misEventos = res
    })
  }

  
  verEvento(idEvento){
    this.eventoService.idEvento$.emit(idEvento)
        this.router.navigate(['/ver-evento']);
  }

}

