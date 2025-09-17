import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao } from '../models/cotacao';

@Injectable({ providedIn: 'root' })
export class CotacaoDolarService {
  private apiServerUrl = 'https://sistemacotacaodolar.onrender.com/api';

  constructor(private http: HttpClient) {}

  public getCotacaoAtual(): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(`${this.apiServerUrl}/moeda/atual`);
  }

  public getCotacaoPorPeriodoFront(
    dataInicial: string,
    dataFinal: string
  ): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(`${this.apiServerUrl}/moeda/periodo/${dataInicial}/${dataFinal}`);
  }


  public getCotacaoMenoresQueAtualFront(
    dataInicial: string,
    dataFinal: string
  ): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(`${this.apiServerUrl}/moeda/cotacoes/${dataInicial}/${dataFinal}`);
  }

}
