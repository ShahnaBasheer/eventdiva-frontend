import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-line-chart-component',
  standalone: true,
  imports: [],
  templateUrl: './line-chart-component.component.html',
  styleUrl: './line-chart-component.component.css'
})


export class LineChartComponentComponent {
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef;
  @Input({required: true}) revenueData: { month: number, year: number, revenue: number }[] = [];



  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const filledRevenueData = this.fillMissingMonths(this.revenueData);
    const labels = filledRevenueData.map(data => `${data.year}-${data.month}`);
    const revenues = filledRevenueData.map(data => data.revenue);

    new Chart(this.revenueCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Revenue',
          data: revenues,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time (Year-Month)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Revenue'
            }
          }
        }
      }
    });
  }


  // This function will fill in the missing months with 0 revenue
  fillMissingMonths(data: { month: number, year: number, revenue: number }[]) {
    const currentYear = new Date().getFullYear();
    const fullYearData = [];

    // Iterate over all months (1 to 12) of the current year
    for (let month = 1; month <= 12; month++) {
      const existingData = data.find(item => item.month === month && item.year === currentYear);
      fullYearData.push({
        month,
        year: currentYear,
        revenue: existingData ? existingData.revenue : 0
      });
    }

    return fullYearData;
  }

}
