import { Component, ViewChild } from '@angular/core';

import {Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ConfiguracoesPage } from '../app/pages/configuracoes/configuracoes';
import { IntroducaoPage } from '../app/pages/introducao/introducao';
import { LoginPage } from '../app/pages/login/login';
import { PerfilPage } from '../app/pages/perfil/perfil';
import { SobrePage } from '../app/pages/sobre/sobre';
import { ContatosPage } from '../app/pages/contatos/contatos';

import { ConfiguracaoService } from './service/configuracaoService/configuracaoService';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = IntroducaoPage;
  pages: Array<{title: string, component: any}>

  constructor(platform: Platform,
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              configuracacaoService: ConfiguracaoService) {
                
                this.pages = [
                  { title: 'Perfil', component: PerfilPage },
                  { title: 'Configurações', component: ConfiguracoesPage }, 
                  { title: 'Sobre', component: SobrePage },
                  { title: 'Contatos', component: ContatosPage}   
                ];
                
                platform.ready().then(() => {
                      let config =  configuracacaoService.getConfigData();
                      if(config == null){
                          this.rootPage = IntroducaoPage;
                          configuracacaoService.setConfigData(false);
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
    this.nav.setRoot(LoginPage);
  }


}

