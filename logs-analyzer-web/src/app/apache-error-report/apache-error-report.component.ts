import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { LogReportComponent } from '../shared/log-report/log-report.component';

@Component({
  selector: 'app-apache-error-report',
  imports: [LogReportComponent],
  standalone: true,
  templateUrl: './apache-error-report.component.html',
  styleUrl: './apache-error-report.component.css'
})
export class ApacheErrorReportComponent implements OnInit{
  data: ChartData<'pie'> = {
      labels: ["200", "201", "204", "400", "401", "403", "404", "500"],
      datasets: [{
        data: [14, 4, 5, 8, 11, 3, 8, 12],
        label: "Status Codes",
        backgroundColor: ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b', '#ff5722', '#8bc34a', '#e91e63', '#3f51b5']
      }
    ]};
  chartType: ChartType = 'pie';
    
  constructor(){}
  
  ngOnInit(): void {
    
  }
}
