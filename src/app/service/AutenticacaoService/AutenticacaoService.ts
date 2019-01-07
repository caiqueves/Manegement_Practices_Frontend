import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MANEGEMENT_API } from '../../app.api';
import { Usuario } from '../../models/usuario';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PraticaService {
 
  usuario = {} as Usuario;

  constructor(private http: HttpClient,
    public navCtrl: NavController) {
  }
  
  alterarSenha(login: string, password: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${MANEGEMENT_API}/esqueciSenha`, { login: login, senha: password })
  }

  logout() {
    this.usuario = undefined
    //localStorage.removeItem("X-EAGLE-AUTH")
    this.navCtrl.push(LoginPage)
  }
}