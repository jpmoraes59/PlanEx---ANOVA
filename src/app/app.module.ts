import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TabelaAnovaComponent } from './tabela-anova/tabela-anova.component';
import { DecimalPipe } from '@angular/common';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    TabelaAnovaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
