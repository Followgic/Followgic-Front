import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
search = new FormControl('')
@Output('search')
searchEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.search.valueChanges
    .subscribe(value => this.searchEmitter.emit(value))
  }

}
