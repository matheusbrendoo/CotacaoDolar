import { Component, OnInit } from '@angular/core';
import { Cotacao } from 'src/app/models/cotacao';
import { CotacaoDolarService } from 'src/app/services/cotacaodolar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {


  cotacaoAtual: Cotacao | null = null;

  constructor(private cotacaoDolarService: CotacaoDolarService) { }

  ngOnInit(): void {
    this.carregarCotacao();
  }


  carregarCotacao(): void {
    this.cotacaoDolarService.getCotacaoAtual().subscribe({
      next: (cotacoes) => {
        if (cotacoes && cotacoes.length > 0) {
          this.cotacaoAtual = cotacoes[0];
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar cotação:', erro);
      }
    });
  }



}
