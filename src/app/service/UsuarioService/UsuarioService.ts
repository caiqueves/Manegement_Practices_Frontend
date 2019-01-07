import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs';
import { MANEGEMENT_API } from '../../app.api';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioService {
 
  usuario = {} as Usuario;

  constructor(private http: HttpClient) {
  }
  
  salvar(nome: string, email:string, cpfOuCnpj: string, tipoFuncao: Number, senha: string, listaTipoMetodologia : Number[] ) : Observable<any> {
    return this.http.post(`${MANEGEMENT_API}/usuarios/`, { nome: nome, email: email, cpfOuCnpj: cpfOuCnpj, tipoFuncao: tipoFuncao, senha: senha, 
                                                           listaTipoMetodologia: listaTipoMetodologia})
  }
  
  buscarUsuario(id : string) {
    return this.http.get<Usuario>(`${MANEGEMENT_API}/usuarios/${id}`)
  }
  
  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${MANEGEMENT_API}/usuarios/`)
}

  editar(id : string,nome: string, email:string, tipoFuncao: Number, senha: string, listaTipoMetodologia : Number[] ) : Observable<any> {
    return this.http.put(`${MANEGEMENT_API}/usuarios/${id}`,{ nome: nome, email: email,tipoFuncao: tipoFuncao, senha: senha, 
      listaTipoMetodologia: listaTipoMetodologia})
  }

  excluir(id : string) {
    return this.http.delete(`${MANEGEMENT_API}/usuarios/${id}`)
  }
}
