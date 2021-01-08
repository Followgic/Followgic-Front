import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
show=false
  constructor( private _router: Router) {
   
   }

  ngOnInit(){
    this._router.events.subscribe(event =>{
      if(event instanceof NavigationStart){
        this.show = true
        
      }else if(event instanceof NavigationEnd ){
        this.show= false
      }
    })
  
  
  }
}
