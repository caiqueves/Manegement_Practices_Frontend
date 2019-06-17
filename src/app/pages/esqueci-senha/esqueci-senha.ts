import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { ToastController } from 'ionic-angular';
import { SegurancaService } from '../../service/segurancaService/segurancaService';
import { LoginPage } from '../login/login';



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
    public segurancaservice: SegurancaService,
    public loadingController: LoadingController ) {

    this.profileImage = 'assets/imgs/img_logo_header.gif';
  }

  esqueciSenha(usuario: Usuario) {
    
    let loading = this.loadingController.create({ content: "Carregando" });

    loading.present();

    setInterval(() => {
    loading.dismissAll();
    }, 2000);
    
    if (usuario.email != null) {
      this.segurancaservice.esqueciSenha(this.usuario.email).subscribe(response => {
        const toast = this.toastCtrl.create({
          message: response.message.toString(),
          duration: 3000
        });
        toast.present();

        this.navCtrl.setRoot(LoginPage);
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
