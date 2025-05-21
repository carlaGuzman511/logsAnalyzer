import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { LogReportComponent } from '../shared/log-report/log-report.component';
import { ApacheAccessLogService } from '../services/apache.access.log.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogReport } from '../models/LogReport';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apache-access-report',
  imports: [CommonModule, LogReportComponent],
  standalone: true,
  templateUrl: './apache-access-report.component.html',
  styleUrl: './apache-access-report.component.css'
})

export class ApacheAccessReportComponent implements OnInit {
  chartColors: string[] = ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b', '#ff5722', '#8bc34a', '#e91e63', '#3f51b5'];  
  statusCodeData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "Status Codes",
      backgroundColor: this.chartColors
    }
  ]};
  statusCodeChartType: ChartType = 'doughnut';
  
  methodData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "Methods",
      backgroundColor: this.chartColors
    }]};
  methodChartType: ChartType = 'bar';

  ipData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "IP Address",
      backgroundColor: this.chartColors
    }]};
  ipChartType: ChartType = 'bar';

  constructor(private service: ApacheAccessLogService, private snackBar: MatSnackBar){
    
  }

  ngOnInit(): void {
    this.getReportByMethod();
    this.getReportByStatusCode();
    this.getReportByIpAddress();
  }

  private getReportByStatusCode(): void{
    this.service.getApacheAccessReports('status_code')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache access logs by status code report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.statusCodeData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Status Code",
            backgroundColor: this.chartColors
        }]
      }});
  }

  private getReportByMethod(): void{
    this.service.getApacheAccessReports('method')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache access logs by methods report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.methodData = {
          labels: report.labels,
          datasets: [
            {
              data: report.data,
              label: "Method",
              backgroundColor: this.chartColors
            }
          ]
        }
      });
  }

  private getReportByIpAddress(): void{
    this.service.getApacheAccessReports('ip_address')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache access logs by ip address report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.ipData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Ip Address",
            backgroundColor: this.chartColors
          }]
        }
      });
  }
}
