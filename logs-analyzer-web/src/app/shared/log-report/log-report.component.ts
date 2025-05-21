import { Component, OnInit, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-log-report',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './log-report.component.html',
  styleUrl: './log-report.component.css'
})
export class LogReportComponent implements OnInit{
  @Input() data: ChartData<'doughnut' | 'bar' | 'line' | 'pie'> = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800']
      }
    ],
  };
  @Input() chartType: ChartType = 'bar';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: ''
      }
    }
  };

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.update();
    }
  }
}
