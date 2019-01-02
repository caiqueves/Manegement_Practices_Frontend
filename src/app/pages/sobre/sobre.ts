import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SobrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage {

  profileImage;
  profileImage2;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profileImage = 'assets/imgs/avatar-sobre.png';
    this.profileImage2 = 'assets/imgs/slide1.jpg';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SobrePage');
  }

}
