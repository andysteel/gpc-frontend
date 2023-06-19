import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface PessoaResponse {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

export interface ContatoResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface FiltroPaginacao {
  tamanho: number;
  pagina: number;
}

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<PessoaResponse> | null;
  sortDirections: NzTableSortOrder[];
}

export interface SalvarPessoaRequest {
  nome?: string;
  cpf?: string;
  dataNascimento?: string;
  contatos?: SalvarContatoRequest[]
  usuario?: string
}

export interface SalvarPessoaResponse {
  id: number;
  nome: string;
}

export interface SalvarContatoRequest {
  nome?: string;
  telefone?: string;
  email?: string;
  usuario?: string;
}

export interface FormSalvarContato {
  idForm: number;
  controlFormNome: string;
  controlFormTel: string;
  controlFormEmail: string;
  labelBotao?: string;
}
