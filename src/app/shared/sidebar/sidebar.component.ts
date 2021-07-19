import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

get historial(){
  return this.giftService.historial;
}

buscar(historial:string){
  console.log(historial);
  this.giftService.buscarGifs(historial);
}

  constructor(private giftService:GifsService){

  }

 
}
