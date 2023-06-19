import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AutenticacaoService } from '../services/autenticacao.service';

export const autenticadoGuard: CanActivateFn = (route, state) => {

  const autenticacaoService = inject(AutenticacaoService);
  const router = inject(Router)

  if(autenticacaoService.pegarDadosDeLogin() !== null) {
    return true
  }
  router.navigate(['welcome']);
  return false;
};
