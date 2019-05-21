import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroducaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introducao',
  templateUrl: 'introducao.html',
})

export class IntroducaoPage {
  
  constructor(private nav: NavController, public navParams: NavParams) {   }

  ionViewDidLoad() {
   console.log('ionViewDidLoad IntroducaoPage');
  }
   
  goToTabsPage() {
    this.nav.push(LoginPage);
  }
}
