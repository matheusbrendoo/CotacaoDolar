import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Cotacao } from 'src/app/models/cotacao';

Chart.register(...registerables);

@Component({
  selector: 'app-historicolist',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css']
})
export class HistoricolistComponent implements OnChanges {

  @Input() cotacoes: Cotacao[] = [];

  currentYear = new Date().getFullYear();
  chartType: ChartType = 'line';

  chartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#94a3b8',
        bodyColor: '#f1f5f9',
        padding: 10,
        callbacks: {
          label: (ctx) => ` R$ ${Number(ctx.parsed.y).toFixed(2)}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#64748b', maxTicksLimit: 8, font: { size: 11 } },
        grid: { color: 'rgba(51, 65, 85, 0.5)' }
      },
      y: {
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (v) => `R$ ${Number(v).toFixed(2)}`
        },
        grid: { color: 'rgba(51, 65, 85, 0.5)' }
      }
    }
  };

  get minPreco(): number {
    return Math.min(...this.cotacoes.map(c => c.preco));
  }

  get maxPreco(): number {
    return Math.max(...this.cotacoes.map(c => c.preco));
  }

  get avgPreco(): number {
    return this.cotacoes.reduce((sum, c) => sum + c.preco, 0) / this.cotacoes.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cotacoes']) {
      this.buildChart();
    }
  }

  private buildChart(): void {
    const prices = this.cotacoes.map(c => c.preco);
    const labels = this.cotacoes.map(c => c.data as string);

    this.chartData = {
      labels,
      datasets: [{
        data: prices,
        label: 'Cotação (R$)',
        fill: true,
        tension: 0.4,
        borderColor: '#3b82f6',
        borderWidth: 2,
        backgroundColor: (ctx: any) => {
          const canvas = ctx.chart.ctx;
          const gradient = canvas.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
          return gradient;
        },
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#0f172a',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#60a5fa',
      }]
    };
  }

  diferencaClass(diferenca: number | undefined): string {
    if (diferenca === undefined || diferenca === 0) return '';
    return diferenca < 0 ? 'success' : 'danger';
  }

  statusText(diferenca: number | undefined): string {
    if (diferenca === undefined || diferenca === 0) return 'Igual';
    return diferenca < 0 ? 'Mais barato' : 'Mais caro';
  }
}
