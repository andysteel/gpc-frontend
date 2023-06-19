import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AutenticacaoService } from './services/autenticacao.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoged!: boolean;
  sub!: Subscription;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sub = this.autenticacaoService.mostraBotaoLogout.subscribe(value => {
      this.isLoged = value
    });
  }

}
