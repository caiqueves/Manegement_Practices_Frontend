import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html',
})
export class CadastrarUsuarioPage {

  usuario = {} as Usuario;
  profileImage;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    
      this.profileImage = 'assets/imgs/img_logo_header.gif';
  }

  Cadastrar(usuario: Usuario) {

    if (usuario.email != null && usuario.senha != null) {
      this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then(() => {

        alert("cadastrado realizado com sucesso");
        this.navCtrl.push(LoginPage);

      }).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert("A senha é muito fraca.");
        } else if (errorCode == 'auth/invalid-email') {
          alert("O email está no formato inválido.");
        } else if (errorCode == 'auth/email-already-in-use') {
          alert("O email já está em uso.");
        } else if (errorCode == 'auth/operation-not-allowed') {
          alert("Lançada se as contas de email / senha não estiverem ativadas. Ative as contas de e-mail / senha no Firebase Console, na guia Auth.")
        } else {
          alert(errorMessage);
        }
      });
    } else {
      alert('Por favor, preencha os campos Email e Senha.')
    }
  }
}

