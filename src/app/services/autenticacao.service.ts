import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  mostraBotaoLogout = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  passarDadosDeLogin(user: SocialUser) {
    sessionStorage.setItem('google-user', JSON.stringify(user));
    this.mostraBotaoLogout.next(true)
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
    sessionStorage.removeItem('google-user');
    this.mostraBotaoLogout.next(false)
    this.router.navigate(['welcome']);
  }

}
