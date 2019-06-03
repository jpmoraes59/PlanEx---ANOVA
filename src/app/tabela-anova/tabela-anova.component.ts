import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-anova',
  templateUrl: './tabela-anova.component.html',
  styleUrls: ['./tabela-anova.component.scss']
})
export class TabelaAnovaComponent implements OnInit {

  @Input() resultado: any;
  @Input() tipo: any;
  
  public tabelaAnova: any;
  public tabelaAnovaY: any;
  public medias: any;
  public variancas: any;


  constructor() { }

  ngOnInit() {
    this.medias = this.resultado.medias
    this.variancas = this.resultado.variancas
    this.tabelaAnova = this.resultado.table
    this.tabelaAnovaY = this.resultado.tableY
  }

}
