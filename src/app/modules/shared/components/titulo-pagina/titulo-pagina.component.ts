import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-pagina',
  templateUrl: './titulo-pagina.component.html',
  styleUrls: ['./titulo-pagina.component.css']
})
export class TituloPaginaComponent {

  @Input({required: true})
  titulo = ''
}
