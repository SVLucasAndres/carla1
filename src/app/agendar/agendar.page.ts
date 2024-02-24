  import { Component, OnInit , AfterViewInit} from '@angular/core';
  import { Firestore } from '@angular/fire/firestore';
  import { AnimationController, IonRefresher } from '@ionic/angular';
  import { Storage } from '@ionic/storage-angular';
  import { collection, doc, getDocs, query, where } from 'firebase/firestore';
  import { DataService } from '../data.service'; 
  import { PopoverController } from '@ionic/angular';
  @Component({
    selector: 'app-agendar',
    templateUrl: './agendar.page.html',
    styleUrls: ['./agendar.page.scss'],
  })
  export class AgendarPage implements OnInit{

  
    constructor(private service:DataService,private db:Firestore, private storage:Storage,private popoverController: PopoverController, ) { }
    
    ngOnInit() { 
      this.obtenerTareas();
      this.tareas=[];
    }
    tareas:any[]=[];
    ruta:any;
    user:any;
    consulta:any;
    async obtenerTareas(){
    this.user = await this.storage.get('User');
    this.ruta = collection(this.db, 'Tareas');
    const ref = query(this.ruta, where('usuario', '==', this.user));
    const consulta = await getDocs(ref);
    
    this.tareas = [];

      consulta.forEach(element => {
        const dato = element.data() as datauser;
        const color = dato.color;
        const comando = dato.comando;
        const fecha = dato.fecha;
        const logoCom = dato.logoCom;
        const id = dato.id;
        const usuario = dato.usuario;
        this.tareas.push({color, comando, fecha, logoCom, id, usuario });
      });
      this.tareas.sort((a, b) => {
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
        return fechaA - fechaB;
      });
    console.log(this.tareas[0]);
    this.service.setTareas(this.tareas[0]);
      
    }
      
    handleRefresh(event:any) {
      setTimeout(() => {
        this.obtenerTareas();
        event.target.complete();
      }, 2000);
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