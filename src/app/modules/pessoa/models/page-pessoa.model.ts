import { Paginacao } from '../../shared/models/paginacao.model'
import { PessoaResponse } from '../../../types/app.interface'

export class PagePessoa extends Paginacao {
  constructor(public content?: PessoaResponse[]) {
    super();
  }
}
