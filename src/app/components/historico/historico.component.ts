import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cotacao } from 'src/app/models/cotacao';
import { CotacaoDolarService } from 'src/app/services/cotacaodolar.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  ajustarParaLocal(date: Date): Date {
    return new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
  }

  flagOpcional: boolean = false;
  dataInicialString: string = '';
  dataFinalString: string = '';


  cotacaoAtual = 0;
  cotacaoPorPeriodoLista: Cotacao[] = [];

  constructor(
    private cotacaoDolarService: CotacaoDolarService,
    private dateFormat: DatePipe
  ) { }

  diferençaAtual: number | undefined



  public getCotacaoPorPeriodo(
    dataInicialString: string,
    dataFinalString: string,
  ): void {
    this.cotacaoPorPeriodoLista = [];

    if (!dataInicialString || !dataFinalString) {
      alert("As datas inicial e final são obrigatórias.");
      return;
    }

    const hoje = new Date();
    const dataInicial = this.ajustarParaLocal(new Date(dataInicialString));
    const dataFinal = this.ajustarParaLocal(new Date(dataFinalString));

    if (dataInicial > dataFinal) {
      alert("A data inicial deve ser menor ou igual à data final.");
      return;
    }

    if (dataInicial > hoje || dataFinal > hoje) {
      alert("As datas não podem ser maiores que a data atual.");
      return;
    }


    const dataInicialFormatada = this.dateFormat.transform(dataInicial, "MM-dd-yyyy") || '';
    const dataFinalFormatada = this.dateFormat.transform(dataFinal, "MM-dd-yyyy") || '';

    if (this.flagOpcional) {
      this.cotacaoDolarService.getCotacaoMenoresQueAtualFront(dataInicialFormatada, dataFinalFormatada)
        .subscribe(cotacoes => {
          this.cotacaoDolarService.getCotacaoAtual().subscribe(cotacaoAtualLista => {
            const cotacaoAtual = cotacaoAtualLista[0]?.preco || 0;

            cotacoes.forEach(cotacao => {
              const diferencaValor = cotacao.preco - cotacaoAtual;
              cotacao.diferenca = diferencaValor;
            });

            this.cotacaoPorPeriodoLista = cotacoes;
          });
        });
    } else {

      this.cotacaoDolarService.getCotacaoPorPeriodoFront(dataInicialFormatada, dataFinalFormatada)
        .subscribe(cotacoes => {
          this.cotacaoDolarService.getCotacaoAtual().subscribe(cotacaoAtualLista => {
            const cotacaoAtual = cotacaoAtualLista[0]?.preco || 0;

            cotacoes.forEach(cotacao => {
              const diferencaValor = cotacao.preco - cotacaoAtual;
              cotacao.diferenca = diferencaValor;
            });

            this.cotacaoPorPeriodoLista = cotacoes;
          });
        });
    }
  }

  ngOnInit() {
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

    this.dataInicialString = this.dateFormat.transform(primeiroDia, 'yyyy-MM-dd')!;
    this.dataFinalString = this.dateFormat.transform(hoje, 'yyyy-MM-dd')!;
  }




  testeee(t: any) {
    console.log(t)
  }

}
