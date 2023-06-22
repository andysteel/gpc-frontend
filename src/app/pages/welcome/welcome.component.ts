import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if(user) {
        this.autenticacaoService.passarDadosDeLogin(user);
      }
    });
  }

}
