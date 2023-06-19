import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastraPessoaComponent } from './pages/cadastra-pessoa/cadastra-pessoa.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    CadastraPessoaComponent
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    IconsProviderModule,
    NzDividerModule,
    NzNotificationModule,
    NzDatePickerModule,
    NzSpinModule
  ]
})
export class PessoaModule { }
