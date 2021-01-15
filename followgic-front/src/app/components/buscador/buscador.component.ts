import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs/operators';
import { MagoService } from 'src/app/services/mago.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
search = new FormControl('')
@Output('search')
searchEmitter = new EventEmitter<string>();

@Input()
busqueda:string='';
  constructor(private magoService: MagoService) { 
  
  }

  ngOnInit() {
    this.search.valueChanges
    .subscribe(value => this.searchEmitter.emit(value))

    this.search.setValue(this.magoService.busqueda)

  }

}
