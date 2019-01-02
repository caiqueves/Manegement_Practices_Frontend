import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { EsqueciSenhaPage } from '../esqueci-senha/esqueci-senha';
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario';
import { Usuario } from '../../models/usuario';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth';
import { PerfilPage } from '../perfil/perfil';
import { ConfiguracaoProvider } from '../../providers/configuracao/configuracao';



/**
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  usuario = {} as Usuario;
  profileImage;
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuController: MenuController,
    public toastCtrl: ToastController,
    public configuracacaoProvider: ConfiguracaoProvider) {

    this.profileImage = 'assets/imgs/img_logo_header.gif';
    
  }

  login(usuario: Usuario) {
    if (usuario.email != null && usuario.senha != null) {
      this.afAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha).then((response) => {
        /*
        let config =    this.configuracacaoProvider.getConfigData().email;
      
        if(config != null){
          this.configuracacaoProvider.setConfigData(false,usuario.email,"")
        }
        else {
          this.configuracacaoProvider.setConfigData(false,usuario.email,"") 
        }
        */
        this.navCtrl.setRoot(PerfilPage);

        const toast = this.toastCtrl.create({
          message: 'Seja Bem Vindo ao PUSH PROJ',
          duration: 3000
        });
        toast.present();
        
      }).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/wrong-password') {
          alert("A senha está errada.");
        } else if (errorCode == 'auth/invalid-email') {
          alert("O email está no formato inválido.");
        } else if (errorCode == 'auth/email-already-in-use') {
          alert("O email já está em uso.");
        } else if (errorCode == 'auth/user-disabled') {
          alert("O usuário correspondente ao email fornecido tiver sido desativado.")
        } else if (errorCode == 'auth/user-not-found') {
          alert(" O usuário não é correspondente ao email fornecido.")
        } else {
          alert(errorMessage);
        }
      });
    } else {
      const toast = this.toastCtrl.create({
        message: 'Por favor, preencha os campos Email e Senha.',
        duration: 3000
      });
      toast.present();

    }
  }


  esqueciMinhaSenha() {
    this.navCtrl.push(EsqueciSenhaPage);
  }

  criarConta() {
    this.navCtrl.push(CadastrarUsuarioPage);
  }

  ionViewDidEnter() {
    this.menuController.enable(false);
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

}
