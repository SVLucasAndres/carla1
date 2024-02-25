import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-agendar-page',
  templateUrl: './agendar-page.page.html',
  styleUrls: ['./agendar-page.page.scss'],
})
export class AgendarPagePage implements OnInit {

  ngOnInit() {
    this.hora();
  }
  fechaHoraFormateada:any;
  async hora(){
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const horaFormateada = fecha.toLocaleTimeString('es-EC', { hour12: false });
    this.fechaHoraFormateada = await `${fechaFormateada}T${horaFormateada}`;
  }
  formData = {
    logoCom:"",
    comando:"",
    fecha:"",
    color:""
  }
  botonHabilitado: boolean = false;
  actualizarEstadoBoton() {
    this.botonHabilitado = this.formData.logoCom !== '' && this.formData.comando !== ''&& this.formData.fecha !== '' && this.formData.color!=='';
  }
  constructor(private db:Firestore, private storage:Storage) {}
 
  ruta:any;
  id:any;
  async agregarTarea(){
    const usuarios = await this.storage.get("User");
    const number = usuarios + this.formData.comando + this.formData.fecha + this.formData.logoCom;
    this.ruta = doc(this.db,'Tareas', number);
    await setDoc(this.ruta, { id: number, logoCom:this.formData.logoCom, color:this.formData.color , comando:this.formData.comando, fecha: this.formData.fecha, usuario: usuarios});
  }
  
}
