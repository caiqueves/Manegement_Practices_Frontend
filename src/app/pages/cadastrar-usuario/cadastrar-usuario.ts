import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UsuarioService } from '../../service/usuarioService/usuarioService';
//import { ConfiguracaoService } from '../../service/configuracaoService/configuracaoService';
import { TipoMetodologiaService } from '../../service/TipoMetodologiaService/TipoMetodologiaService';
import { RetornoSucesso } from '../../models/retornoSucesso';
import { RetornoError } from '../../models/retornoError';
import { TipoMetodologia } from '../../models/tipoMetodologia';
import { Usuario } from '../../models/usuario';



@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html'
})
export class CadastrarUsuarioPage {

  usuario = {} as Usuario;
  profileImage;

  listafuncoes: any[];
  listaMetodologias:TipoMetodologia[];

  retornoS: RetornoSucesso;
  retornoE: RetornoError;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private usuarioService: UsuarioService,
    //private configuracaoService: ConfiguracaoService,
    private tipoMetodologiaService: TipoMetodologiaService
    ) {
  
      this.profileImage = 'assets/imgs/img_logo_header.gif';
      
      this.listafuncoes = [
          { id:1, valor: 'GERENTE'  },
          { id:2, valor: 'ANALISTA'},
          { id:3, valor: 'PROGRAMADOR' }
      ];

      this.tipoMetodologiaService.listar().subscribe(
        retorno => {
           this.listaMetodologias = retorno;
        },
        error => {
           const toast = this.toastCtrl.create({
            message: error.message.toString(),
            duration: 3000
          });
          toast.present();
        });
  }

  Cadastrar(usuario : Usuario) {
    if (usuario.nome != null && usuario.email != null && usuario.tipoFuncao != null && usuario.senha != null && usuario.tipoMetodologia != null) {
      this.usuarioService.salvar(usuario.nome,usuario.email,usuario.tipoFuncao,usuario.senha,usuario.tipoMetodologia)
       .subscribe (
         retorno => {
           this.retornoS = retorno;

           const toast = this.toastCtrl.create({
            message: this.retornoS.message.toString(),
            duration: 3000
          });
          toast.present();

           this.navCtrl.push(LoginPage);
         },
         retorno => {
            this.retornoE = retorno.error;
          
            const toast = this.toastCtrl.create({
              message: this.retornoE.message.toString(),
              duration: 3000
            });
            toast.present();
         })
      } else {
         const toast = this.toastCtrl.create({
          message: 'Por favor, preencha os campos abaixo.',
          duration: 3000
        });
        toast.present();
    }
  }
}

