import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { LogReportComponent } from '../shared/log-report/log-report.component';

@Component({
  selector: 'app-apache-access-report',
  imports: [LogReportComponent],
  standalone: true,
  templateUrl: './apache-access-report.component.html',
  styleUrl: './apache-access-report.component.css'
})

export class ApacheAccessReportComponent {
  statusCodeData: ChartData<'pie'> = {
    labels: ["200", "201", "204", "400", "401", "403", "404", "500"],
    datasets: [{
      data: [14, 4, 5, 8, 11, 3, 8, 12],
      label: "Status Codes",
      backgroundColor: ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b', '#ff5722', '#8bc34a', '#e91e63', '#3f51b5']
    }
  ]};
  statusCodeChartType: ChartType = 'pie';
  
  methodData: ChartData<'doughnut'> = {
    labels: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    datasets: [{
      data: [14, 4, 8, 1, 3],
      label: "Methods",
      backgroundColor: ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b', '#ff5722', '#8bc34a', '#e91e63', '#3f51b5']
    }]};
  methodChartType: ChartType = 'doughnut';

  ipData: ChartData<'bar'> = {
    labels: ["192.168.0.150", "127.0.0.0", "192.168.0.20", "192.168.0.5", "192.168.0.12"],
    datasets: [{
      data: [14, 4, 8, 1, 3],
      label: "IP Address",
      backgroundColor: ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b', '#ff5722', '#8bc34a', '#e91e63', '#3f51b5']
    }]};
  ipChartType: ChartType = 'bar';

}
