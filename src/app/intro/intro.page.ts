import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner,Barcode } from '@capacitor-mlkit/barcode-scanning';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  constructor(private alertController:AlertController) { 
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlertS();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlertS(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentAlert(id: any) {
    const alert = await this.alertController.create({
      message: id,
    });
    this.presentAlert(alert);
  }
}
