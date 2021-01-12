import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';

@Component({
  selector: 'app-buscador-etiquetas',
  templateUrl: './buscador-etiquetas.component.html',
  styleUrls: ['./buscador-etiquetas.component.css']
})
export class BuscadorEtiquetasComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  modalidadCtrl = new FormControl();
  filteredModalidad: Observable<string[]>;
  modalidadesFiltradas: any[]=[]
  todasModalidades: any[]=[]
  
  buscarModalidades:any[]=[]
  buscarModalidadesNombres:any[]=[]
  copidaTodasModalidades:any[]=[]

  @Input()
  modalidades: any;
  


  @ViewChild('modalidadInput') modalidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private modalidadesService: ModalidadesService) { 
   
  
  }
  ngOnInit() {
   this.getModalidades()

    
  }

  filtroModalidad(){
    this.filteredModalidad = this.modalidadCtrl.valueChanges.pipe(
      startWith(null),
      map((modalidad: string | null) => modalidad ? this._filter(modalidad) : this.todasModalidades.slice()));
     
      
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our modalidad
    if ((value || '').trim()) {
      this.modalidadesFiltradas.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.modalidadCtrl.setValue(null);
  }

  remove(modalidad: string): void {
    const index = this.modalidadesFiltradas.indexOf(modalidad);
    this.buscarModalidadesNombres = this.modalidades.filter(modalidad => this.modalidadesFiltradas.includes(modalidad.nombre)).map(modalidad => modalidad.nombre)
    const index2 = this.buscarModalidadesNombres.indexOf(modalidad);

    if (index >= 0) {
      this.modalidadesFiltradas.splice(index, 1);
      this.todasModalidades = this.copidaTodasModalidades.filter(modalidad => !this.modalidadesFiltradas.includes(modalidad))
      this.filtroModalidad()
      this.buscarModalidades.splice(index2, 1);
      this.modalidadesService.modalidadesControl$.emit(this.buscarModalidades)

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.modalidadesFiltradas.push(event.option.viewValue);
    this.modalidadInput.nativeElement.value = '';
    this.modalidadCtrl.setValue(null);
    this.todasModalidades = this.copidaTodasModalidades.filter(modalidad => !this.modalidadesFiltradas.includes(modalidad))
    this.filtroModalidad()
    this.buscarModalidades = this.modalidades.filter(modalidad => this.modalidadesFiltradas.includes(modalidad.nombre)).map(modalidad => modalidad.pk)
    this.modalidadesService.modalidadesControl$.emit(this.buscarModalidades)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.todasModalidades.filter(modalidad => modalidad.toLowerCase().indexOf(filterValue) === 0);
  }

  getModalidades() {

       this.modalidadesService.modalidades$.subscribe(res=>{
        this.todasModalidades=res.map(modalidad => modalidad.nombre)
        this.modalidades= res
        this.copidaTodasModalidades=this.todasModalidades
        this.filtroModalidad()
      })
      

  }

}
