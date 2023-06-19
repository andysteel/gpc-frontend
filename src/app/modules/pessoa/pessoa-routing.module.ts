import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastraPessoaComponent } from './pages/cadastra-pessoa/cadastra-pessoa.component';
import { autenticadoGuard } from 'src/app/guards/autenticado.guard';

const routes: Routes = [
  { path: 'cadastrar', component: CadastraPessoaComponent, canActivate: [autenticadoGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
