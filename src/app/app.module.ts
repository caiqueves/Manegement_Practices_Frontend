import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '../../node_modules/@angular/http';
import { NgModule} from '@angular/core';
import { MyApp } from './app.component';

import { LoginPage } from '../app/pages/login/login';
import { IntroducaoPageModule } from '../app/pages/introducao/introducao.module';
import { SobrePage } from '../app/pages/sobre/sobre';
import { PerfilPage } from '../app/pages/perfil/perfil';
import { EsqueciSenhaPageModule } from '../app/pages/esqueci-senha/esqueci-senha.module';
import { CadastrarUsuarioPageModule } from '../app/pages/cadastrar-usuario/cadastrar-usuario.module';
import { ContatosPage } from '../app/pages/contatos/contatos';
import { ConfiguracoesPage } from '../app/pages/configuracoes/configuracoes';
import { Push } from '@ionic-native/push';
import { Camera } from '@ionic-native/camera';

import { UsuarioService } from './service/usuarioService/usuarioService';
import { TipoMetodologiaService } from './service/TipoMetodologiaService/TipoMetodologiaService';

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
    UsuarioService,
    TipoMetodologiaService
  ]
})
export class AppModule {}
