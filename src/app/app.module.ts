import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '../../node_modules/@angular/http';
import { NgModule} from '@angular/core';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { IntroducaoPageModule } from '../pages/introducao/introducao.module';
import { SobrePage } from '../pages/sobre/sobre';
import { PerfilPage } from '../pages/perfil/perfil';
import { EsqueciSenhaPageModule } from '../pages/esqueci-senha/esqueci-senha.module';
import { CadastrarUsuarioPageModule } from '../pages/cadastrar-usuario/cadastrar-usuario.module';
import { ContatosPage } from '../pages/contatos/contatos';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';

import { Push } from '@ionic-native/push';
import { Camera } from '@ionic-native/camera';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SobrePage,
    PerfilPage,
    ContatosPage,
    ConfiguracoesPage
  ],
  imports: [
    BrowserModule,
    
    IonicModule.forRoot(MyApp),
    IntroducaoPageModule,
    HttpModule,
    EsqueciSenhaPageModule,
    CadastrarUsuarioPageModule
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    LoginPage,
    SobrePage,
    PerfilPage,
    ContatosPage,
    ConfiguracoesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider    
  ]
})
export class AppModule {}
