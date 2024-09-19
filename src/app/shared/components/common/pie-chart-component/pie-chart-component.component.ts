import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-pie-chart-component',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart-component.component.html',
  styleUrl: './pie-chart-component.component.css'
})


export class PieChartComponentComponent {
  chart: any;
  @Input({required: true}) allBookings: any[] = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const { labels, data } = this.transformBookingData(this.allBookings);

    this.chart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  transformBookingData(allBookings: any[]): { labels: string[], data: number[] } {
    const labels = allBookings.map(item => item.status);
    const data = allBookings.map(item => item.count);
    return { labels, data };
  }
}
