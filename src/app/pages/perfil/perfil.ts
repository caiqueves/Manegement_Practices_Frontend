import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuarioService/usuarioService';
import { TipoMetodologia } from '../../models/tipoMetodologia';
import { TipoMetodologiaService } from '../../service/TipoMetodologiaService/TipoMetodologiaService';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario = {} as Usuario;
  profileImage;
  
  listafuncoes: any[];
  listaMetodologias: TipoMetodologia[];
  tipoMetodologia = {} as TipoMetodologia;

  idFuncao :any;
  idMetodologia :any;  
  nav: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private usuarioService: UsuarioService,
    private tipoMetodologiaService: TipoMetodologiaService) {

    if (this.profileImage == null) {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    }
    else {
      this.profileImage = ''; 
    }

    this.listafuncoes =  [
      { descricao: 'GERENTE', a: 1 },
      { descricao: 'ANALISTA', a: 2 },
      { descricao: 'PROGRAMADOR',a: 3 }
    ];

    this.tipoMetodologiaService.listar().subscribe(
      retorno => {
        this.listaMetodologias = retorno;
      },
      error => {
        
        const toast = this.toastCtrl.create({
          message: error.error.message.toString(),
          duration: 3000
        });
        toast.present();
      });
    
  this.usuarioService.buscarUsuario(localStorage.getItem('IdUsuario'))
  .subscribe(
    dat => {
        this.usuario.id = dat.id;
        this.usuario.nome = dat.nome;
        this.usuario.email = dat.email;
        
        if (dat.tipoFuncao == 'GERENTE' )
          this.usuario.tipoFuncao = 1; 
          
        else if (dat.tipoFuncao == 'ANALISTA' ) {
          this.usuario.tipoFuncao = 2;
        }
        else if (dat.tipoFuncao == 'PROGRAMADOR' ) {
          this.usuario.tipoFuncao = 3;
        }

        this.tipoMetodologia = dat.tipoMetodologia; 
        this.usuario.tipoMetodologia = this.tipoMetodologia.id;  

        this.usuario.senha = dat.senha;   
  })  
}
   
/*
  TirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.profileImage = base64image;

      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })     
  }
  */

 
  Editar(usuario : Usuario){

    var id_ = Number.parseInt(localStorage.getItem('IdUsuario'));
    console.log(usuario.senha)
    var senha = usuario.senha == "" ? this.usuario.senha : usuario.senha;

    console.log(usuario.senha)
   this.usuarioService.editar(id_,usuario.nome,usuario.email, usuario.tipoFuncao, senha,usuario.tipoMetodologia).subscribe (
     retorno => {
      const toast = this.toastCtrl.create({
        message: retorno.message,
        duration: 3000
      });
      toast.present();

     }, error => {
      const toast = this.toastCtrl.create({
        message: error.error.message,
        duration: 3000
      });
      toast.present();
     });
  }

  Excluir() {
    this.usuarioService.excluir( localStorage.getItem('IdUsuario')).subscribe (
      retorno => {
       const toast = this.toastCtrl.create({
         message: "Usuário excluído com sucesso !",
         duration: 3000
       });
       toast.present();

       this.navCtrl.setRoot(LoginPage);
       localStorage.removeItem("X-PUSH-AUTH")
       localStorage.removeItem('IdUsuario');
 
      }, error => {
       const toast = this.toastCtrl.create({
         message: error.error.message,
         duration: 3000
       });
       toast.present();
      });
  }
}



