import { Component, ViewChild } from '@angular/core';

import {Platform, Nav, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroducaoPage } from '../pages/introducao/introducao';
import { ConfiguracaoProvider } from '../providers/configuracao/configuracao';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { SobrePage } from '../pages/sobre/sobre';
import { ContatosPage } from '../pages/contatos/contatos';
import { UsuarioProvider } from '../providers/usuario/usuario';


@Component({
  templateUrl: 'app.html',
  providers: [
    ConfiguracaoProvider
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = IntroducaoPage;
  pages: Array<{title: string, component: any}>

  constructor(platform: Platform,
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              configuracacaoProvider: ConfiguracaoProvider,
              menuController: MenuController,
              usuarioProvider: UsuarioProvider ) {
                
                this.pages = [
                  { title: 'Perfil', component: PerfilPage },
                  { title: 'Configurações', component: ConfiguracoesPage }, 
                  { title: 'Sobre', component: SobrePage },
                  { title: 'Contatos', component: ContatosPage}   
                ];
                
                
                platform.ready().then(() => {
                      let config =    configuracacaoProvider.getConfigData();
                      if(config == null){
                          this.rootPage = IntroducaoPage;
                          configuracacaoProvider.setConfigData(false);
                      }else{
                          this.rootPage = LoginPage;
                      }
                      
  
                      statusBar.styleDefault();
                      splashScreen.hide();
                    });
               }

  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    //this.usuarioProvider.logout();
    this.nav.setRoot(LoginPage);
     
  }

}

