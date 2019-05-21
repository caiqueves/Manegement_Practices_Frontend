import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoMetodologia } from '../../models/tipoMetodologia';
import { Observable } from 'rxjs';
import { MANEGEMENT_API } from '../../app.api';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TipoMetodologiaService {
 
  tipoMetodologia = {} as TipoMetodologia;

  constructor(private http: HttpClient) {
  }
  
  salvar(descricao:string) : Observable<any> {
    return this.http.post(`${MANEGEMENT_API}/tipoMetodologia/`, { descricao: descricao})
  }
  
  buscarTipoMetodologia(id : string) {
    return this.http.get<TipoMetodologia>(`${MANEGEMENT_API}/tipoMetodologia/${id}`)
  }
  
  listar(): Observable<TipoMetodologia[]> {
    return this.http.get<TipoMetodologia[]>(`${MANEGEMENT_API}/tipoMetodologia/`)
    
}

  editar(id : string, descricao: string ) : Observable<any> {
    return this.http.put(`${MANEGEMENT_API}/tipoMetodologia/${id}`,{ descricao: descricao })
  }

  excluir(id : string) {
    return this.http.delete(`${MANEGEMENT_API}/tipoMetodologia/${id}`)
  }
}
