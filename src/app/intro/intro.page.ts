import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private barcodeScanner:BarcodeScanner, private alertController:AlertController) { 
  }

  ngOnInit() {
  }
  async presentAlert(id: any) {
    const alert = await this.alertController.create({
      message: id,
    });
    this.presentAlert(alert);
  }
  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.presentAlert(barcodeData.text);
     }).catch(err => {
      this.presentAlert(err);
     });
  }
}
