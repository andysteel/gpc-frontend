import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private notification: NzNotificationService) {}

  passarDadosDeLogin(user: SocialUser) {
    sessionStorage.setItem('google-user', JSON.stringify(user));
    this.router.navigate(['inicio'])
  }

  pegarDadosDeLogin() {
    return sessionStorage.getItem('google-user');
  }

  pegarUsuarioLogado() {
    const usuario = sessionStorage.getItem('google-user') as string;
    return JSON.parse(usuario) as SocialUser;
  }

  logout() {
    this.socialAuthService.signOut(true)
    .then((_) => {
      sessionStorage.clear();
      this.router.navigate(['welcome']);
    })
    .catch(error => {
      this.notification.error('Error', 'Erro ao tentar realizar o logout do google');
      throw new Error(error);
    })
  }

}
