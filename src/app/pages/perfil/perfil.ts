import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfiguracaoProvider } from '../../providers/configuracao/configuracao';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  profileImage;
  usuario = {} as Usuario;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configuracacaoProvider: ConfiguracaoProvider,
    public camera: Camera) {


    if (this.profileImage == null) {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    }
    else {
      this.profileImage = ''; // Carregar Imagem do Storage do Firebase
    }
  }

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

  Editar(usuario) {

  }

  Salvar(usuario){

  }
}



