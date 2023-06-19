import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { autenticadoGuard } from './guards/autenticado.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [autenticadoGuard]
  // children: [
  //   {
  //     path: 'passoa',
  //     loadChildren: () => import('./modules/pessoa/pessoa.module').then(m => m.PessoaModule),
  //     canActivate: [autenticadoGuard]
  //   }
  // ]
  },
  {
    path: 'pessoa',
    loadChildren: () => import('./modules/pessoa/pessoa.module').then(m => m.PessoaModule),
    canActivate: [autenticadoGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
