import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraPessoaComponent } from './cadastra-pessoa.component';

describe('CadastraPessoaComponent', () => {
  let component: CadastraPessoaComponent;
  let fixture: ComponentFixture<CadastraPessoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastraPessoaComponent]
    });
    fixture = TestBed.createComponent(CadastraPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
