import { Component } from '@angular/core';
import { EliminarService } from '../eliminar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private serv:EliminarService) {}
  mostrarHora(){
    this.serv.eliminar();
  }

}
