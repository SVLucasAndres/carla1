import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';


@Component({
  selector: 'app-intro2',
  templateUrl: './intro2.page.html',
  styleUrls: ['./intro2.page.scss'],
})
export class Intro2Page implements OnInit {

  constructor( private ble:BluetoothSerial) { }

  ngOnInit() {
    this.ActivarBluetooth();
  }
  
  mensaje:any;
  ActivarBluetooth(){
    this.ble.isEnabled().then(response =>{
      this.lista();
    },error=>{
      console.log("error");
    });
  }
  lista(){
    this.ble.list().then(response =>{
      this.mensaje= response;
    },error=>{
      console.log(error);
    });
  }
}
