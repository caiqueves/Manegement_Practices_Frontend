import { HttpClient } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Pratica } from '../../models/pratica';
import { Observable } from 'rxjs';
import { MANEGEMENT_API } from '../../app.api';


@Injectable()
export class PraticaService {
 
  pratica = {} as Pratica;

  constructor(private http: HttpClient) {
  }

  salvar(descricao:string) : Observable<any> {
    return this.http.post(`${MANEGEMENT_API}/pratica/`, { descricao: descricao})
  }
  
  buscarPratica(id : string) {
    return this.http.get<Pratica>(`${MANEGEMENT_API}/pratica/${id}`)
  }
  
  listar(): Observable<Pratica[]> {
    return this.http.get<Pratica[]>(`${MANEGEMENT_API}/pratica/`)
}

  editar(id : string, descricao: string ) : Observable<any> {
    return this.http.put(`${MANEGEMENT_API}/pratica/${id}`,{descricao: descricao })
  }

  excluir(id : string) {
    return this.http.delete(`${MANEGEMENT_API}/pratica/${id}`)
  }

  buscarPraticaUsuario(idUsuario : string) {
    return this.http.get<Pratica>(`${MANEGEMENT_API}/pratica/findTipoMetodologia/${idUsuario}`)
  }
}
