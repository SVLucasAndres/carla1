import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-intro2',
  templateUrl: './intro2.page.html',
  styleUrls: ['./intro2.page.scss'],
})
export class Intro2Page implements OnInit {

  constructor(private router:NavController, private ble:BluetoothSerial ,private alert:AlertController, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.ActivarBluetooth();
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Conectando...',
      duration: 10000,
      spinner: 'dots'
    });

    loading.present();
  }
  mensaje:any;
  ActivarBluetooth(){
    this.ble.isEnabled().then(response =>{
      this.lista();
    },error=>{
      this.presentAlert(error);
    });
  }
  lista(){
    this.ble.list().then(response =>{
      this.mensaje= response;
    },error=>{
      this.presentAlert(error);
    });
  }
  async conect(address:any){
    this.showLoading();
    await this.ble.connect(address).subscribe(async success =>{
      this.loadingCtrl.dismiss();
      this.deviceConnected();
      this.presentAlert(success);
      this.enviar("Hola, soy Carla!");
      await this.ble.available();
      const mensaje = this.recibir();
      if(await mensaje == "2312"){
        this.router.navigateRoot('intro3');
      }else{
        this.presentAlert("Este dispositivo no es CARLA");
        this.ble.disconnect();
      }
    },error =>{
      this.presentAlert("Error, no fue posible realizar la conexión");
    });
  }
  desconectar(){
    this.ble.disconnect().then(response =>{
      this.presentAlert("Intento de conexión cancelado");
    },error=>{
      this.presentAlert(error);
    });
  }
  deviceConnected(){
    this.ble.subscribe('/n').subscribe(success=>{
      console.log(success);
    })
  }
  enviar(string:string){
    this.ble.write(string).then(response=>{
      console.log("oky");
    }, error=>{
      this.presentAlert(error);
    })
  }
  async recibir(): Promise<string> {
    try {
      const response = await this.ble.read();
      console.log(response);
      return response;
    } catch (error) {
      this.presentAlert(error);
      return "null";
    }
  }
  async presentAlert(meserror:any) {
    const alert = await this.alert.create({
      header: meserror,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
