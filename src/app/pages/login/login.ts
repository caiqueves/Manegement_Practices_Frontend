import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ToastController, NavParams } from 'ionic-angular';
import { EsqueciSenhaPage } from '../esqueci-senha/esqueci-senha';
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario';
import { Usuario } from '../../models/usuario';
import { ConfiguracaoService } from '../../service/configuracaoService/configuracaoService';
import { SegurancaService } from '../../service/segurancaService/segurancaService';
import { UsuarioService } from '../../service/usuarioService/usuarioService';
import { LoadingController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

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
    public usuarioservice: UsuarioService,
    public loadingController: LoadingController
    ) 
    {
     
    this.profileImage = 'assets/imgs/img_logo_header.gif';
  }

  login(usuario: Usuario) {
    
    let loading = this.loadingController.create({ content: "Carregando" });

    loading.present();

    setInterval(() => {
    loading.dismissAll();
    }, 2000);
    

    if (usuario.email != null && usuario.senha != null) {
  
      this.segurancaservice.login(usuario.email, usuario.senha).subscribe(
      response =>  {
  
        this.segurancaservice.sucessoLogin(response.headers.get('Authorization'));
      
        this.usuarioservice.selecionarEmail(usuario.email)
        .subscribe(
                dat => { 
                        localStorage.removeItem('IdUsuario');
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
            message: "Não foi possível efetuar o login. Por favor verifique seu e-mail e senha.",
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
