import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-intro2',
  templateUrl: './intro2.page.html',
  styleUrls: ['./intro2.page.scss'],
})
export class Intro2Page implements OnInit {

  constructor( private ble:BluetoothSerial ,private alert:AlertController) { }

  ngOnInit() {
    this.ActivarBluetooth();
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
  async conect(adress:any){
    this.ble.connect(adress).subscribe(success=>{
      this.deviceConnected();
    }, error=>{
      this.presentAlert(error);
    })
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
  async presentAlert(meserror:any) {
    const alert = await this.alert.create({
      header: meserror,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
