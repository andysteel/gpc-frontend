import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FiltroPaginacao, SalvarPessoaRequest, SalvarPessoaResponse } from '../../../types/app.interface';
import { PagePessoa } from '../models/page-pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseUrl = 'https://gpc-app.andersondias.net.br/api';

  constructor(private httpClient: HttpClient) { }

  salvarPessoa(pessoa: SalvarPessoaRequest) {
    return this.httpClient.post<SalvarPessoaResponse>(`${this.baseUrl}/v1/pessoas`, pessoa);
  }

  consultarPessoas(filtro: FiltroPaginacao) {
    let params = new HttpParams();
    params = params.set('page', filtro.pagina - 1);
    params = params.set('size', filtro.tamanho);

    return this.httpClient.get<PagePessoa>(`${this.baseUrl}/v1/pessoas`, {params});
  }

  apagarPessoa(idPessoa: number, usuario:string) {
    let params = new HttpParams();
    params = params.set("usuario", usuario);
    return this.httpClient.delete<void>(`${this.baseUrl}/v1/pessoas/${idPessoa}`, {params});
  }
}
