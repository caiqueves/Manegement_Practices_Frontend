import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ToastController, NavParams } from 'ionic-angular';
import { EsqueciSenhaPage } from '../esqueci-senha/esqueci-senha';
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario';
import { Usuario } from '../../models/usuario';
import { ConfiguracaoService } from '../../service/configuracaoService/configuracaoService';
import { SegurancaService } from '../../service/segurancaService/segurancaService';
import { PerfilPage } from '../perfil/perfil';
import { UsuarioService } from '../../service/usuarioService/usuarioService';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  usuario = {} as Usuario;
  profileImage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuController: MenuController,
    public toastCtrl: ToastController,
    public configuracacaoService: ConfiguracaoService,
    public segurancaservice: SegurancaService,
    public usuarioservice: UsuarioService
    ) 
    {
     
    this.profileImage = 'assets/imgs/img_logo_header.gif';
  }

  login(usuario: Usuario) {
    
    if (usuario.email != null && usuario.senha != null) {
      
      this.segurancaservice.login(usuario.email, usuario.senha).subscribe(
      response =>  {
  
        this.segurancaservice.sucessoLogin(response.headers.get('Authorization'));
      
        this.usuarioservice.selecionarEmail(usuario.email)
        .subscribe(
                dat => { 
                        localStorage.setItem("IdUsuario",dat.id);
                       }
        );


        this.navCtrl.setRoot(PerfilPage);
        
        const toast = this.toastCtrl.create({
          message: 'Seja Bem Vindo ao PUSH PROJ',
          duration: 3000
        });
        toast.present();
        
      }, error => {
           const toast = this.toastCtrl.create
           ({
            message: error.error.message,
            duration: 3000
          });
          toast.present()
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
