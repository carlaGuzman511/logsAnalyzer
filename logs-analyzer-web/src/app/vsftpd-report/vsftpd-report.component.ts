import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { LogReportComponent } from '../shared/log-report/log-report.component';

@Component({
  selector: 'app-vsftpd-report',
  imports: [LogReportComponent],
  standalone: true,
  templateUrl: './vsftpd-report.component.html',
  styleUrl: './vsftpd-report.component.css'
})

export class VsftpdReportComponent implements OnInit{
  actionsData: ChartData<'bar'> = {
    labels: ["OK LOGIN", "OK UPLOAD", "OK DOWNLOAD", "CONNECT", "FAIL DOWNLOAD", "FAIL UPLOAD", "FAIL LOGIN"],
    datasets: [{
      data: [14, 4, 5, 8, 11, 3, 8],
      label: "Actions",
      backgroundColor: ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b']
      }
    ]};
  actionsChartType: ChartType = 'bar';

  usersData: ChartData<'pie'> = {
    labels: ["aso", "aso05", "carla", "aso1"],
    datasets: [{
      data: [14, 4, 5, 8],
      label: "Users",
      backgroundColor: ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3']
      }
    ]};
  usersChartType: ChartType = 'pie';
    
  ipData: ChartData<'doughnut'> = {
    labels: ["192.168.0.150", "127.0.0.0", "192.168.0.20", "192.168.0.5", "192.168.0.12"],
    datasets: [{
      data: [14, 4, 5, 8, 36],
      label: "IP Address",
      backgroundColor: ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#3f51b5']
      }
    ]};
  ipChartType: ChartType = 'doughnut';
  
  constructor(){}
  
  ngOnInit(): void {
    
  }
}
