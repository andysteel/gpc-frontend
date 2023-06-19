import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';



@NgModule({
  declarations: [
    TituloPaginaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TituloPaginaComponent
  ]
})
export class SharedModule { }
