import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.component.html',
  styleUrls: ['./politica-privacidad.component.css']
})
export class PoliticaPrivacidadComponent implements OnInit {

  constructor( public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data:{esDialog:boolean}) { }

  ngOnInit(): void {
  }



}
