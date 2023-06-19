import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { PessoaService } from 'src/app/modules/pessoa/services/pessoa.service';
import { FormSalvarContato, SalvarContatoRequest, SalvarPessoaRequest } from 'src/app/types/app.interface';

@Component({
  selector: 'app-cadastra-pessoa',
  templateUrl: './cadastra-pessoa.component.html',
  styleUrls: ['./cadastra-pessoa.component.css']
})
export class CadastraPessoaComponent implements OnInit {

  pessoaForm!: UntypedFormGroup;
  contatos: Array<FormSalvarContato> = [];
  salvarPessoaRequest: SalvarPessoaRequest = {}
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private pessoaService: PessoaService,
    private autenticacaoService: AutenticacaoService,
    private router: Router) {}

  ngOnInit(): void {
    this.pessoaForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      nascimento: [null, Validators.required]
    });
    this.adicionarContato();
  }

  adicionarContato(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.contatos.length > 0 ? this.contatos[this.contatos.length - 1].idForm + 1 : 0;

    const control: FormSalvarContato = {
      idForm: id,
      controlFormNome: `contatoNome${id}`,
      controlFormTel: `contatoTel${id}`,
      controlFormEmail: `contatoEmail${id}`,
      labelBotao: 'Adicionar contato'
    };
    const index = this.contatos.push(control);
    this.pessoaForm.addControl(
      this.contatos[index - 1].controlFormNome,
      new UntypedFormControl(null, Validators.required)
    );
    this.pessoaForm.addControl(
      this.contatos[index - 1].controlFormTel,
      new UntypedFormControl(null, [Validators.required])
    );
    this.pessoaForm.addControl(
      this.contatos[index - 1].controlFormEmail,
      new UntypedFormControl(null, [Validators.required, Validators.email])
    );
  }

  removerContato(contato: FormSalvarContato, e: MouseEvent): void {
    e.preventDefault();
    if (this.contatos.length > 1) {
      const index = this.contatos.indexOf(contato);
      this.contatos.splice(index, 1);
      this.pessoaForm.removeControl(contato.controlFormNome);
      this.pessoaForm.removeControl(contato.controlFormTel);
      this.pessoaForm.removeControl(contato.controlFormEmail);
    }
  }

  submitForm() {
    this.isLoading = true;
    this.salvarPessoaRequest = {
      cpf: this.pessoaForm.get('cpf')?.value,
      dataNascimento: this.pessoaForm.get('nascimento')?.value,
      nome: this.pessoaForm.get('nome')?.value,
      usuario: this.autenticacaoService.pegarUsuarioLogado().email
    }
    const contatosParaSalvar: SalvarContatoRequest[] = [];
    this.contatos.forEach(contato => {
      const salvarContatoRequest: SalvarContatoRequest = {};

      salvarContatoRequest.nome = this.pessoaForm.get(contato.controlFormNome)?.value;
      salvarContatoRequest.telefone = this.pessoaForm.get(contato.controlFormTel)?.value;
      salvarContatoRequest.email = this.pessoaForm.get(contato.controlFormEmail)?.value;
      salvarContatoRequest.usuario = this.autenticacaoService.pegarUsuarioLogado().email;
      contatosParaSalvar.push(salvarContatoRequest);
    })
    this.salvarPessoaRequest.contatos = [...contatosParaSalvar];

    this.pessoaService.salvarPessoa(this.salvarPessoaRequest)
    .subscribe({
      next: (response) => {
        this.isLoading = false
        this.contatos = [];
        this.pessoaForm.reset();
        this.adicionarContato();
        this.notification.success('Sucesso', `${response.nome} salvo com sucesso !`);
      },
      error: (error) => {
        this.isLoading = false;
        if(error?.error?.className?.match('MethodArgumentNotValidException')) {
          error?.error?.validations?.forEach((mensagem: any) => {
            this.notification.error('Erro', mensagem?.fieldMessage);
          })
        } else if(error?.error?.className) {
          this.notification.error('Erro', error?.error?.details);
        } else {
          this.notification.error('Erro', 'Estamos com dificuldade em precessar sua requisição');
        }
      },
      complete:() => this.isLoading = false
    })
  }

  voltar() {
    this.router.navigate(['inicio']);
  }
}
