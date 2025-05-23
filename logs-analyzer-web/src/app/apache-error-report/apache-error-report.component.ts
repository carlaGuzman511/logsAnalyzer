import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { LogReportComponent } from '../shared/log-report/log-report.component';
import { ApacheErrorLogService } from '../services/apache.error.log.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { LogReport } from '../models/LogReport';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apache-error-report',
  imports: [CommonModule, LogReportComponent],
  standalone: true,
  templateUrl: './apache-error-report.component.html',
  styleUrl: './apache-error-report.component.css'
})

export class ApacheErrorReportComponent implements OnInit{
  chartColor: string[] = ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b', '#ff5722', '#8bc34a', '#e91e63', '#3f51b5'];
  levelData: ChartData<'bar'> = {
      labels: [],
      datasets: [{
        data: [],
        label: "Apache Error Logs by Level",
        backgroundColor: this.chartColor
      }
  ]};
  
  chartType: ChartType = 'bar';
  
  clientIpData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "Apache Error Logs by Client IP",
      backgroundColor: this.chartColor
    }
  ]};
  
  clientIpChartType: ChartType = 'doughnut';

  errorCodeData: ChartData<'bar'> = {
  labels: [],
  datasets: [{
    data: [],
    label: "Apache Error Logs by Error Code",
    backgroundColor: this.chartColor
    }
  ]};

  moduleData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "Apache Error Logs by Module",
      backgroundColor: this.chartColor
    }
  ]};
  
  constructor(private service: ApacheErrorLogService, private snackBar: MatSnackBar){
      
  }
  
  ngOnInit(): void {
    this.getReportByClientIp();  
    this.getReportByErrorCode();
    this.getReportByLevel();
    this.getReportByModule();
  }

  private getReportByClientIp(): void{
    this.service.getApacheErrorReports('client_ip')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache error logs by client ip report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.clientIpData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Apache Error Logs by Client IP",
            backgroundColor: this.chartColor
          }]
        }
      });
  }
  
  private getReportByErrorCode(): void{
    this.service.getApacheErrorReports('error_code')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache error logs by error code report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.errorCodeData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Apache Error Logs by Error Code",
            backgroundColor: this.chartColor
          }]
        }
      });
  }
  
  private getReportByModule(): void{
    this.service.getApacheErrorReports('module')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache error logs by module report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.moduleData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Apache Error Logs by Module",
            backgroundColor: this.chartColor
          }]
        }
      });
  }

  private getReportByLevel(): void{
    this.service.getApacheErrorReports('level')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache error logs by level report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.levelData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Apache Error Logs by Level",
            backgroundColor: this.chartColor
          }]
        }
      });
  }
}
