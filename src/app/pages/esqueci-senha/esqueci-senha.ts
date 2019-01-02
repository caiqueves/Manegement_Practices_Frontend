import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from 'ionic-angular';

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
  
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

    this.profileImage = 'assets/imgs/img_logo_header.gif';
    
  }

  MudarSenha(usuario: Usuario) {
    if (usuario.email != null) {
      this.afAuth.auth.sendPasswordResetEmail(this.usuario.email).then(() => {

        alert("Por favor, verifique o seu e-mail.Para seguir com a mudança da senha");

      }).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/user-not-found') {
          alert("Não há registro de usuário correspondente a esse email. O usuário pode ter sido excluído.");

        } else if (errorCode == 'auth/invalid-email') {
          alert("O email está no formato inválido");
        } else if (error.L.error.code == 'auth/argument-error') {
          alert("O primeiro argumento email deve ser uma string válida.")
        } else {

          alert(errorMessage);
        }
      });
    } else {
      alert('Por favor, preencha o campo de Email.')
    }
  }
}
