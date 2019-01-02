import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import {TipoMetodologia } from '../../models/tipoMetodologia';
import { Observable } from 'rxjs';
import { MANEGEMENT_API } from '../../app/app.api';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
 
  usuario = {} as Usuario;
  tipoMetodologia = { } as TipoMetodologia;

  constructor(private http: HttpClient) {
  }
  
  salvar(nome: string, email:string, cpfOuCnpj: string, tipoFuncao: Number, senha: string, listaTipoMetodologia : Number[] ) {
    return this.http.post(`${MANEGEMENT_API}/usuarios/`, { nome: nome, email: email, cpfOuCnpj: cpfOuCnpj, tipoFuncao: tipoFuncao, senha: senha, 
                                                          listaTipoMetodologia: listaTipoMetodologia})
    


  }
  
  buscarUsuario(id : string) {
    return this.http.get<Usuario>(`${MANEGEMENT_API}/usuarios/${id}`)
  }
  
  listar(){

  }

  editar() {

  } 

  excluir() {

  }
  logout(){
    
  }
}
