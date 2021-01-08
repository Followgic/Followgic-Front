import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  modalidadesFiltradas: any[]=[]
  todasModalidades: any[]=[]
  modalidades: any[]=[]
  buscarModalidades:any[]=[]

  
@Output('fruitCtrl')
modalidadesEmitter = new EventEmitter<string>();

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor( private modalidadesService: ModalidadesService) { 
  this.getModalidades()

  
  }
  ngOnInit() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.todasModalidades.slice()));

    
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.modalidadesFiltradas.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.modalidadesFiltradas.indexOf(fruit);
    const index2 = this.buscarModalidades.indexOf(fruit);

    if (index >= 0) {
      this.modalidadesFiltradas.splice(index, 1);
      this.buscarModalidades.splice(index, 1);

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.modalidadesFiltradas.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.buscarModalidades = this.modalidades.filter(modalidad => this.modalidadesFiltradas.includes(modalidad.nombre)).map(modalidad => modalidad.pk)
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.todasModalidades.filter(modalidad => modalidad.toLowerCase().indexOf(filterValue) === 0);
  }

  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;
      this.todasModalidades = res.map(modalidad => modalidad.nombre)
    })

  }

}
