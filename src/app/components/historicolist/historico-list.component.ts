import { Component, Input } from '@angular/core';
import { Cotacao } from 'src/app/models/cotacao';

@Component({
  selector: 'app-historicolist',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css']
})
export class HistoricolistComponent  {

  @Input() cotacoes: Cotacao [] = [];

  currentYear: number = new Date().getFullYear();

}
