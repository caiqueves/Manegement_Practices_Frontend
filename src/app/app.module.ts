import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgModule} from '@angular/core';
import { MyApp } from './app.component';

import { LoginPage } from '../app/pages/login/login';
import { SobrePage } from '../app/pages/sobre/sobre';
import { PerfilPage } from '../app/pages/perfil/perfil';
import { ContatosPage } from '../app/pages/contatos/contatos';
import { ConfiguracoesPage } from '../app/pages/configuracoes/configuracoes';
import { IntroducaoPage } from './pages/introducao/introducao';
import { EsqueciSenhaPage } from './pages/esqueci-senha/esqueci-senha';
import { CadastrarUsuarioPage } from './pages/cadastrar-usuario/cadastrar-usuario';

import { UsuarioService } from './service/usuarioService/usuarioService';
import { TipoMetodologiaService } from './service/TipoMetodologiaService/TipoMetodologiaService';
import { PraticaService } from './service/PraticaService/PraticaService';
import { ConfiguracaoService } from './service/configuracaoService/configuracaoService';
import { SegurancaService } from './service/segurancaService/segurancaService';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { Push } from '@ionic-native/push';
import { Camera } from '@ionic-native/camera';
import { AuthInterceptor } from './pages/login/auth.interceptor';


@NgModule({
  declarations: [
    MyApp,
    ConfiguracoesPage,
    ContatosPage,
    LoginPage,
    PerfilPage,
    SobrePage,
    IntroducaoPage,
    EsqueciSenhaPage,
    CadastrarUsuarioPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    ConfiguracoesPage,
    ContatosPage,
    LoginPage,
    PerfilPage,
    SobrePage,
    IntroducaoPage,
    EsqueciSenhaPage,
    CadastrarUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SegurancaService,
    ConfiguracaoService,
    PraticaService,
    TipoMetodologiaService,
    UsuarioService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule {}
