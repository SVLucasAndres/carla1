  import { Component, OnInit } from '@angular/core';
  import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
  import { Storage } from '@ionic/storage-angular'; 
  import { collection, doc, getDocs, query, where } from 'firebase/firestore';
  import { Firestore } from '@angular/fire/firestore';
  import { DataService } from '../data.service';

  @Component({
    selector: 'app-prin',
    templateUrl: './prin.page.html',
    styleUrls: ['./prin.page.scss'],
  })
  export class PrinPage implements OnInit {
    usuarioID:string="";
    constructor(private service:DataService,private actionSheetCtrl: ActionSheetController, private router: NavController, private db:Firestore, private storage:Storage) { 
      
    }
    ngOnInit() {
      this.obtenerTareas();
    }  
    tareas:any[]=[];
      ruta:any;
      user:any;
      consulta:any;
      color: any;
      comando: any;
      fecha: any;
      logoCom: any;
      id: any;
      usuario: any;
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
        const fechaAlmacenada = new Date(this.tareas[0].fecha);
        const horaActual = new Date();
        const diferenciaTiempo = fechaAlmacenada.getTime() - horaActual.getTime();
        const diasRestantes = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
        const horasRestantes = Math.floor(diferenciaTiempo / (1000 * 60 * 60));
        const minutosRestantes = Math.floor((diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60));
        this.fecha = `Tiempo restante: ${diasRestantes} días, ${horasRestantes} horas y ${minutosRestantes} minutos`;
      
      }
      handleRefresh(event:any) {
        setTimeout(() => {
          this.obtenerTareas();
          event.target.complete();
        }, 2000);
      }

      tiempoRes(){
        
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
