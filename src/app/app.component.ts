import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ANOVA';

  public tabelaAnova: any;
  public tabelaAnovaY: any;
  public medias: any;
  public variancas: any;

  public indexEditar;

  public formInicial: FormGroup;
  public tratamentos: Array<[]>;
  public podeCalcular: boolean = false;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.criaFormInicial();

  }

  criaFormInicial() {
    this.formInicial = this.fb.group({
      quantidadeTratamento: new FormControl(''),
      tipoAnova: new FormControl('Experimentos'),
      alfa: new FormControl('5'),
    });
  }

  adicionarTratamentos() {

    if (this.indexEditar || this.indexEditar == 0) {
      this.tratamentos.splice(this.indexEditar)
      this.indexEditar = '';
    }
    if (!this.tratamentos) {
      this.tratamentos = [this.formInicial.controls.quantidadeTratamento.value.split(" ")]
    } else {
      this.tratamentos.push(this.formInicial.controls.quantidadeTratamento.value.split(" "));
    }
    this.tratamentos.length > 1 ? this.podeCalcular = true : this.podeCalcular = false;
    this.formInicial.controls.quantidadeTratamento.reset()



  }

  editarTratamento(index: number) {
    this.indexEditar = index;

    let seta = this.tratamentos[index].toString();

    this.formInicial.controls.quantidadeTratamento.setValue(seta.replace(/\D+/g, " "));
  }

  inverteArray() {
    var col = 0
    var column = [];
    var arrayY = []
    for (var a = 0; a < this.tratamentos[0].length; a++) {
      for (var i = 0; i < this.tratamentos.length; i++) {
        column.push(this.tratamentos[i][a]);
      }
      arrayY.push(column);
      column = [];
    }

    return arrayY;
  }

  calcular() {
    let retorno = this.tabela(this.tratamentos);

    this.medias = retorno.medias
    this.variancas = retorno.variancas
    this.tabelaAnova = retorno.table
    this.tabelaAnovaY = retorno.tableY
  }

  apagarTratamento(index: number) {
    this.tratamentos.splice(index)


  }


  reiniciar(oque: any) {

    swal.fire({
      title: 'Reiniciar ?',
      text: 'Tu quer mesmo apagar esses calculos!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, reiniciar!',
      cancelButtonText: 'Não, ainda quero.'
    }).then((result) => {
      if (result.value) {
        this.tratamentos = [];

        this.tabelaAnova = '';
        this.tabelaAnovaY = '';
        this.medias = '';
      }
    })




  }

  //funçõs estatisticas
  num(elem) {
    var f = parseFloat(elem);
    if (f) return f;
    return 0;
  };

  sum(arr) {
    if (arr.length == 0) return null;
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      total += this.num(arr[i]);
    }
    return total;
  };

  smMean(arr) {
    if (arr.length == 0) return null;
    let mu;
    return mu = this.sum(arr) / arr.length;
  };

  mean(amostra) {
    var total = 0, count = 0;
    amostra.forEach(sample => {
      total += this.sum(sample);
      count += sample.length;
      this.sum(sample);
    });
    return total / count;
  }

  somaDosQuadrados(amostra) {
    var entreTratamento = 0, dentroTratamento = 0, fullMean = this.mean(amostra);
    amostra.forEach(sample => {
      var mu = this.smMean(sample);
      sample.forEach(val => {
        dentroTratamento += (val - mu) * (val - mu);
      });
      entreTratamento += (mu - fullMean) * (mu - fullMean) * sample.length;
    });

    return {
      total: entreTratamento + dentroTratamento,
      entreTratamento: entreTratamento,
      dentroTratamento: dentroTratamento,
    };
  };

  varianca(amostra) {
    var varianca = 0;
    for (var i = 0; i < amostra.length; i++) {
      varianca += (this.smMean(amostra) - amostra[i]) * (this.smMean(amostra) - amostra[i]);
    }
    varianca = varianca / amostra.length;
    return varianca
  }

  calculavarinca(amostra) {
    let variancaArray = [];
    amostra.forEach(sample => {
      variancaArray.push(this.varianca(sample));

    });
    return variancaArray;
  }

  media(amostra) {
    let mediaArray = [];
    amostra.forEach(sample => {
      mediaArray.push(this.smMean(sample));

    });
    return mediaArray

  }

  // Calcula o grau de liberdade
  grauDeLiberdade(amostra) {
    var total = 0;
    amostra.forEach(sample => {
      total += sample.length;
    });

    var entreTratamento = amostra.length - 1;
    var dentroTratamento = total - amostra.length;

    return {
      total: entreTratamento + dentroTratamento,
      entreTratamento: entreTratamento,
      dentroTratamento: dentroTratamento
    };
  };


  // calcula quadrado da media
  quadradoDaMedia = function (amostra, verbose?) {
    var somadosquadrados = this.somaDosQuadrados(amostra);
    var graudeliberdade = this.grauDeLiberdade(amostra);

    var results = {
      entreTratamento: somadosquadrados.entreTratamento / graudeliberdade.entreTratamento,
      dentroTratamento: somadosquadrados.dentroTratamento / graudeliberdade.dentroTratamento,
      somadosquadrados,
      graudeliberdade
    };

    if (verbose) {
      results.somadosquadrados = somadosquadrados;
      results.graudeliberdade = graudeliberdade;
    }


    return results;
  };


  // Calcula o F - Razao
  razao(amostra) {
    var quadradodamedia = this.quadradoDaMedia(amostra);
    return quadradodamedia.entreTratamento / quadradodamedia.dentroTratamento;
  };

  tabela(amostra) {
    var quadradodamedia = this.quadradoDaMedia(amostra, true);
    var medias = this.media(amostra)
    var variancas = this.calculavarinca(amostra);
    let tabela

    if (this.formInicial.controls.tipoAnova.value == "Experimentos") {
      tabela = {
        table: {
          entreTratamento: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.entreTratamento,
            grauDeLiberdade: quadradodamedia.graudeliberdade.entreTratamento,
            quadradoDaMedia: quadradodamedia.entreTratamento,
            F: quadradodamedia.entreTratamento / quadradodamedia.dentroTratamento
          },
          dentroTratamento: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.dentroTratamento,
            grauDeLiberdade: quadradodamedia.graudeliberdade.dentroTratamento,
            quadradoDaMedia: quadradodamedia.dentroTratamento
          },
          total: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.total,
            grauDeLiberdade: quadradodamedia.graudeliberdade.total
          }
        },
        medias,
        variancas
      };
    } else {
      let arrayY = this.inverteArray();
      console.log(arrayY)
      var quadradodamediaY = this.quadradoDaMedia(arrayY, true);
      var mediasY = this.media(arrayY)
      var variancasY = this.calculavarinca(arrayY);

      /* 
      Lembrar de trocar o nome da caoluna da coluna 'causa de varianção'
      */

      tabela = {
        table: {
          entreTratamento: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.entreTratamento,
            grauDeLiberdade: quadradodamedia.graudeliberdade.entreTratamento,
            quadradoDaMedia: quadradodamedia.entreTratamento,
            F: quadradodamedia.entreTratamento / quadradodamedia.dentroTratamento
          },
          dentroTratamento: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.dentroTratamento,
            grauDeLiberdade: quadradodamedia.graudeliberdade.dentroTratamento,
            quadradoDaMedia: quadradodamedia.dentroTratamento
          },
          total: {
            somaDosQuadrados: quadradodamedia.somadosquadrados.total,
            grauDeLiberdade: quadradodamedia.graudeliberdade.total
          }
        },
        tableY: {
          entreTratamento: {
            somaDosQuadrados: quadradodamediaY.somadosquadrados.entreTratamento,
            grauDeLiberdade: quadradodamediaY.graudeliberdade.entreTratamento,
            quadradoDaMedia: quadradodamediaY.entreTratamento,
            F: quadradodamediaY.entreTratamento / quadradodamediaY.dentroTratamento
          },
          dentroTratamento: {
            somaDosQuadrados: quadradodamediaY.somadosquadrados.dentroTratamento,
            grauDeLiberdade: quadradodamediaY.graudeliberdade.dentroTratamento,
            quadradoDaMedia: quadradodamediaY.dentroTratamento
          },
          total: {
            somaDosQuadrados: quadradodamediaY.somadosquadrados.total,
            grauDeLiberdade: quadradodamediaY.graudeliberdade.total
          }
        },
        mediasY,
        variancasY,
        medias,
        variancas
      };
    }
    console.log(tabela)
    return tabela

  }


}