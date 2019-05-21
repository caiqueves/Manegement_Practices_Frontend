import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { MANEGEMENT_API } from '../../app.api';
import { Observable } from 'rxjs';

@Injectable()
export class SegurancaService {
  [x: string]: any;

  usuario = {} as Usuario;
  user: Usuario;
  lastUrl: string;

  constructor(public http: HttpClient) {
  }

  esqueciSenha(email: string): Observable<any> {
    return this.http.post(`${MANEGEMENT_API}/autenticacao/esqueciSenha`, { email: email })
  }
  
  login(email: string, senha: string){
    return this.http.post(`${MANEGEMENT_API}/login`,{ email: email, senha: senha },
      {
        observe: 'response',
        responseType: 'text'
      });      
  };

  sucessoLogin(authorizationValue: string) {
    localStorage.setItem('X-PUSH-AUTH', authorizationValue);
  }

  isLoggedIn(): boolean {
    return this.user !== undefined
  }

  logout() {
    this.user = undefined
    localStorage.removeItem("X-PUSH-AUTH")
    

  }
}







