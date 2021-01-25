import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suspenso',
  templateUrl: './suspenso.component.html',
  styleUrls: ['./suspenso.component.css']
})
export class SuspensoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuspensoComponent>,private router: Router, @Inject(MAT_DIALOG_DATA) public data: {respuestasCorrectas: number}) { }

  ngOnInit(): void {
    
  }

  cerrarDialog(): void {
    this.router.navigate(['/home'])
    this.dialogRef.close();
  }

}
