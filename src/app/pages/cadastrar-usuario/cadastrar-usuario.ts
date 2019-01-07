import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';

import { RetornoError } from '../../models/retornoError';
import { RetornoSucesso } from '../../models/retornoSucesso';
import { UsuarioService } from '../../service/usuarioService/usuarioService';
import { ConfiguracaoService } from '../../service/configuracaoService/configuracaoService';



@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html'
})
export class CadastrarUsuarioPage {

  usuario = {} as Usuario;
  retornoSucesso = { } as RetornoSucesso;
  retornoError = { } as RetornoError;
  profileImage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private usuarioService: UsuarioService,
    private configuracaoService: ConfiguracaoService  ) {
    
      this.profileImage = 'assets/imgs/img_logo_header.gif';
  }


  Cadastrar(usuario: Usuario) {

    if (usuario != null) {
      this.usuarioService.salvar(usuario.nome,usuario.email,usuario.cpfOuCnpj,usuario.tipoFuncao,usuario.senha,usuario.listaTipoMetodologia)
       .subscribe (
         retornoSucesso => {
           this.retornoSucesso = retornoSucesso;
          
           let config = this.configuracaoService. getConfigData();
           if(config != null){
               this.configuracaoService.setConfigData(false,null,null,this.retornoSucesso.id);
           }
           else {
               this.configuracaoService.setConfigData(false,null,null,this.retornoSucesso.id);
           }
           alert(retornoSucesso.message);
           this.navCtrl.push(LoginPage);
         },
         retornoError => {
            alert(retornoError.error.message)
         })
      } else {
         alert('Por favor, preencha os campos abaixo.')
    }
  }
}

