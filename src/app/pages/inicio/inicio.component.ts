import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PessoaService } from 'src/app/modules/pessoa/services/pessoa.service';
import { ColumnItem, ContatoResponse, FiltroPaginacao, PessoaResponse } from 'src/app/types/app.interface';
import { ContatoService } from 'src/app/modules/contato/services/contato.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { PagePessoa } from 'src/app/modules/pessoa/models/page-pessoa.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  pessoas: PessoaResponse[] = [];
  pagePessoa: PagePessoa = {};
  totalElementos = 0;
  contatosPessoa: ContatoResponse[] = [];
  filtro: FiltroPaginacao = {pagina: 1, tamanho: 10};
  colunas: ColumnItem[] = [
    {
      name: 'Nome',
      sortOrder: null,
      sortFn: (a: PessoaResponse, b: PessoaResponse) => a.nome.localeCompare(b.nome),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'CPF',
      sortOrder: null,
      sortFn: (a: PessoaResponse, b: PessoaResponse) => a.nome.localeCompare(b.nome),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Data de Nascimento',
      sortOrder: null,
      sortFn: (a: PessoaResponse, b: PessoaResponse) => a.nome.localeCompare(b.nome),
      sortDirections: ['ascend', 'descend', null],
    }
  ];

  isLoading = false;

  @ViewChild('contatos')
  contatosTemplates!: TemplateRef<any>;

  constructor(
    private router: Router,
    private pessoaService: PessoaService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private contatoService: ContatoService,
    private autenticacaoService: AutenticacaoService) {}


  ngOnInit(): void {
    this.consultaPessoas();
  }

  async logOut(): Promise<void> {
    this.autenticacaoService.logout();
  }

  consultaPessoas() {
    this.pessoaService.consultarPessoas(this.filtro)
    .subscribe({
      next: (response) => {
        this.pagePessoa = response;
        this.totalElementos = this.pagePessoa.totalElements as number;
        this.pessoas = this.pagePessoa.content as PessoaResponse[];
      }
    })
  }

  navegarCadastrar() {
    this.router.navigate(['pessoa/cadastrar']);
  }

  mudaPagina(event: number) {
    this.filtro.pagina = event;
    this.consultaPessoas();
  }
  mudaTamanhoPagina(event: number) {
    this.filtro.pagina = 1;
    this.filtro.tamanho = event;
    this.consultaPessoas();
  }

  abrirModalContatos(pessoa: PessoaResponse) {
    this.isLoading = true;
    this.contatoService.consultarContatos(pessoa.id)
    .subscribe({
      next: response => {
        this.contatosPessoa = response.content as ContatoResponse[]
        this.construirModal(pessoa);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.contatosPessoa = [];
        if(error?.error?.className) {
          this.notification.error('Erro', error?.error?.details);
        } else {
          this.notification.error('Erro', 'Estamos com dificuldade em precessar sua requisição');
        }
      }
    })

  }

  showConfirm(pessoa: PessoaResponse): void {
   const confirm: NzModalRef = this.modalService.confirm({
      nzTitle: `Deseja excluir ${pessoa.nome} ?`,
      nzContent: 'Esta operação não poderá ser desfeita.',
      nzOnOk: () =>
        this.pessoaService.apagarPessoa(pessoa.id, this.autenticacaoService.pegarUsuarioLogado().email)
        .subscribe({
          next: (_) => {
            this.consultaPessoas();
            this.notification.success('Sucesso', 'Pessoa excluída com sucesso');
          },
          error: (error) => {
            console.log(error)
            if(error?.error?.className) {
              this.notification.error('Erro', error?.error?.details);
            } else {
              this.notification.error('Erro', 'Estamos com dificuldade em precessar sua requisição');
            }
          }
        })
    });
  }

  private construirModal(pessoa: PessoaResponse) {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: `Contatos de ${pessoa.nome}`,
      nzContent: this.contatosTemplates,
      nzFooter: [
        {
          label: 'Fechar',
          type: 'primary',
          onClick: () => modal.destroy()
        },
      ]
    })
  }
}
