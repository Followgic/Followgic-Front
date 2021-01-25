import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PerfilComponent } from '../perfil.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
export interface Modalidad {
  pk: number;
  nombre: string;
}


@Component({
  selector: 'app-editar-modalidades',
  templateUrl: './editar-modalidades.component.html',
  styleUrls: ['./editar-modalidades.component.css']
})
export class EditarModalidadesComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  nombreTodasModalidades: any;
  nombreMisModalidades: any;
  idMisModalidades: any;
  modalidadControl = new FormControl();
  options: Modalidad[] = []
  filteredModalidad: Observable<Modalidad[]>;
  eliminando: any
  nuevaModalidad:any
  copiaMago:any

  @ViewChild('modalidadInput') modalidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(public dialogRef: MatDialogRef<PerfilComponent>, @Inject(MAT_DIALOG_DATA) public data: { modalidades: any[any],
     misModalidades: any, mago: any }, private magoService: MagoService,private modalidadesService: ModalidadesService) {
       
    this.nombreMisModalidades = this.data.misModalidades.map(modalidad => modalidad.nombre)
    this.nombreTodasModalidades = this.data.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
    this.idMisModalidades = this.data.misModalidades.map(modalidad => modalidad.pk)
    this.copiaMago= Object.assign({} , this.data.mago)
    delete this.copiaMago.foto
    this.options = this.data["modalidades"]
  


  }

  ngOnInit() {
    this.filtroModalidad()

  }

  filtroModalidad() {
    this.filteredModalidad = this.modalidadControl.valueChanges.pipe(
      startWith(null),
      map((modalidad: string | null) => modalidad ? this._filter(modalidad) : this.nombreTodasModalidades.slice()));
  }

  displayFn(modalidad: Modalidad): string {
    return modalidad && modalidad.nombre ? modalidad.nombre : '';
  }

  private _filter(nombre: string): string[] {
    const filterValue = nombre.toLowerCase();

    return this.nombreTodasModalidades.filter(modalidad => modalidad.toLowerCase().includes(filterValue));
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let modalidad

    // Add our fruit
    if ((value || '').trim()) {
    
      
      modalidad = value.trim().toLowerCase()
      modalidad = modalidad.charAt(0).toUpperCase() + modalidad.slice(1);
      if(!this.nombreMisModalidades.includes(modalidad) && !this.nombreTodasModalidades.includes(modalidad)){
      this.nombreMisModalidades.push(modalidad);
      this.nombreTodasModalidades = this.data.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
      this.nuevaModalidad= {nombre: modalidad}
      this.createModalidad(this.nuevaModalidad)
      }else if(this.nombreTodasModalidades.includes(modalidad)){
        this.nombreMisModalidades.push(modalidad);
        this.nombreTodasModalidades = this.data.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
        this.modalidadControl.setValue(modalidad)
        this.save()
        this.modalidadInput.nativeElement.value = '';
        this.modalidadControl.setValue(null);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.modalidadControl.setValue(null);
  }


  remove(modalidad: Modalidad): void {
    const index = this.nombreMisModalidades.indexOf(modalidad);

    if (index >= 0) {
      this.nombreMisModalidades.splice(index, 1);
      this.nombreTodasModalidades = this.data.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
      this.filtroModalidad()
      this.eliminando = modalidad
      this.save()
    }


  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.nombreMisModalidades.includes(event.option.viewValue)) {
      this.nombreMisModalidades.push(event.option.viewValue);
      this.nombreTodasModalidades = this.data.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
      this.save()
    }
    this.modalidadInput.nativeElement.value = '';
    this.modalidadControl.setValue(null);
    
    

  }


  save(id?) {
   

    let modalidad

    if (!this.eliminando && !this.nuevaModalidad) {

      if (this.data.modalidades.map(modalidad => modalidad.nombre).includes(this.modalidadControl.value)) {
        modalidad = this.data.modalidades.filter(modalidad => modalidad.nombre.includes(this.modalidadControl.value))
        this.idMisModalidades.push(modalidad[0].pk)
        

      }
    } else if(this.eliminando){
      modalidad = this.data.modalidades.filter(modalidad => modalidad.nombre.includes(this.eliminando))
      var i = this.idMisModalidades.indexOf(modalidad[0].pk);
      if (i !== -1) {
        this.idMisModalidades.splice(i, 1);
        this.eliminando = null
      }
      
    }else if(this.nuevaModalidad){
    
      this.idMisModalidades.push(id)
      this.nuevaModalidad = null

    }

      this.copiaMago.modalidades = this.idMisModalidades

    
    this.magoService.editUsuario(this.copiaMago).subscribe(res => {
 
     


    })

  }


  createModalidad(modalidad){
    this.modalidadesService.crearModalidad(modalidad).subscribe(res => {
     
      this.save(res.pk)


    })

  }

}
