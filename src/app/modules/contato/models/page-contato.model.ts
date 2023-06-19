import { Paginacao } from '../../shared/models/paginacao.model'
import { ContatoResponse } from '../../../types/app.interface'

export class PageContato extends Paginacao {
  constructor(public content?: ContatoResponse[]) {
    super();
  }
}
