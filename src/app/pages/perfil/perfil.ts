import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuarioService/usuarioService';
import { TipoMetodologia } from '../../models/tipoMetodologia';
import { TipoMetodologiaService } from '../../service/TipoMetodologiaService/TipoMetodologiaService';


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
  tipoMetodologia: TipoMetodologia;
  id_metodologia : number;
    
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
      { text: 'Gerente', id: 1 },
      { text: 'Analista', id: 2 },
      { text: 'Programador',id: 3 }
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
        this.usuario.tipoFuncao = dat.tipoFuncao; 
        this.tipoMetodologia = dat.TipoMetodologia; 
        this.id_metodologia = this.tipoMetodologia.id;   
        console.log(this.id_metodologia);
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


  Editar(usuario : Usuario) {
     

  }

  Salvar(usuario : Usuario){

  }
}



