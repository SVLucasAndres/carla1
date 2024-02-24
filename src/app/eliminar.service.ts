import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class EliminarService {

  constructor(private storage:Storage,private db:Firestore) {
    this.eliminar();
  }
  usuario:any;
  ruta:any;
  tareas:any[]=[];
  async eliminar(){
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0]; // Obtenemos la parte de la fecha en formato YYYY-MM-DD
    const horaFormateada = fecha.toLocaleTimeString('es-EC', { hour12: false }); // Obtenemos la parte de la hora en formato HH:mm:ss
    const fechaHoraFormateada = await `${fechaFormateada}T${horaFormateada}`;
    this.ruta =  await collection(this.db,'Tareas');
    const ref = await query(this.ruta);
    const consulta = await getDocs(ref);
    this.tareas = [];
    
    consulta.forEach(async element => {
        const dato = element.data() as datauser;
        const id = dato.id.toString();
        const fecha = new Date(dato.fecha);
        if (isNaN(fecha.getTime())) {
          console.error(`La fecha '${dato.fecha}' no es válida`);
          return;
        }
        if(fecha < new Date(fechaHoraFormateada)){
          const docRef = doc(this.db, 'Tareas', id);
          await deleteDoc(docRef);
        }else{
          console.log(id + ": Mantiene");
        }
      });

  }
}
interface datauser {
  color: string;
  comando: string;
  fecha: string;
  logoCom: number;
  id: number;
  usuario: number;
}
