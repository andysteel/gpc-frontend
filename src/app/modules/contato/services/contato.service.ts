import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageContato } from '../models/page-contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private baseUrl = environment.envVar.BASE_GPC_URL;

  constructor(private httpClient: HttpClient) { }

  consultarContatos(idPessoa: number) {
    return this.httpClient.get<PageContato>(`${this.baseUrl}/v1/contatos/pessoa/${idPessoa}`)
  }
}
