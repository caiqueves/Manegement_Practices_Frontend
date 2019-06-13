import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MANEGEMENT_API } from '../../app.api';


@Injectable()
export class UsuarioService {
 
  constructor(private http: HttpClient) {
  }
  

  salvar(nome: string, email:string, tipoFuncao: number, senha: string, tipoMetodologia : number ) : Observable<any> {
    return this.http.post(`${MANEGEMENT_API}/usuario/`, { nome: nome, email: email, idTipoFuncao: tipoFuncao, senha: senha, 
      idTipoMetodologia: tipoMetodologia})
  }
  
  buscarUsuario(id : string) {
    return this.http.get<any>(`${MANEGEMENT_API}/usuario/${id}`)
  }
  
  selecionarEmail(email : string) {
    return this.http.get<any>(`${MANEGEMENT_API}/usuario/emailUsuario/${email}`)
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${MANEGEMENT_API}/usuario/`)
  }  

  editar(id : number,name: string, email:string, tipoFuncao: Number, senha: string, tipoMetodologia : Number ) : Observable<any> {
    return this.http.put(`${MANEGEMENT_API}/usuario/${id}`,{ nome: name, email: email,idTipoFuncao: tipoFuncao, senha: senha, 
      idTipoMetodologia: tipoMetodologia})
  }

  excluir(id : string) {
    return this.http.delete(`${MANEGEMENT_API}/usuario/${id}`) 
  }
}