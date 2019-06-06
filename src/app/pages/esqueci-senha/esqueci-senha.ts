import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { ToastController } from 'ionic-angular';
import { SegurancaService } from '../../service/segurancaService/segurancaService';

/**
 * Generated class for the EsqueciSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-esqueci-senha',
  templateUrl: 'esqueci-senha.html',
})
export class EsqueciSenhaPage {

  usuario = {} as Usuario;
  profileImage;
  actionCodeSettings;
  email = String;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public segurancaservice: SegurancaService ) {

    this.profileImage = 'assets/imgs/img_logo_header.gif';
  }

  esqueciSenha(usuario: Usuario) {
    
    if (usuario.email != null) {
      this.segurancaservice.esqueciSenha(this.usuario.email).subscribe(response => {
        const toast = this.toastCtrl.create({
          message: response.message.toString(),
          duration: 3000
        });
        toast.present();
      }, 
      response => {
        const toast = this.toastCtrl.create({
          message: response.error.message.toString(),
          duration: 3000
        });
        toast.present();
      });
    } else {
        const toast = this.toastCtrl.create({
          message: 'Por favor, preencha o campo de Email.',
          duration: 3000
        });
        toast.present();
    }  
  }
}
