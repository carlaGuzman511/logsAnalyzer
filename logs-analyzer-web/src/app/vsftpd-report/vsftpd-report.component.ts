import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { LogReportComponent } from '../shared/log-report/log-report.component';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogReport } from '../models/LogReport';
import { FtpLogService } from '../services/ftp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vsftpd-report',
  imports: [CommonModule, LogReportComponent],
  standalone: true,
  templateUrl: './vsftpd-report.component.html',
  styleUrl: './vsftpd-report.component.css'
})

export class VsftpdReportComponent implements OnInit{
  chartColor: string[] = ['#3f51b5', '#8bc34a', '#ff5722', '#2196f3', '#9c27b0', '#00bcd4', '#ffeb3b', '#ff5722', '#8bc34a', '#e91e63', '#3f51b5'];
  actionsData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "Actions",
      backgroundColor: this.chartColor
      }
    ]};
  actionsChartType: ChartType = 'doughnut';

  usersData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "Users",
      backgroundColor: this.chartColor
      }
    ]};
  usersChartType: ChartType = 'bar';
    
  ipData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      label: "IP Address",
      backgroundColor: this.chartColor
      }
    ]};
  ipChartType: ChartType = 'doughnut';
  
  constructor(private service: FtpLogService, private snackBar: MatSnackBar){
    
  }

  ngOnInit(): void {
    this.getReportByUser();
    this.getReportByAction();
    this.getReportByIpAddress();
  }

  private getReportByUser(): void{
    this.service.getFtpReports('user')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching ftp logs by user report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.usersData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Users",
            backgroundColor: this.chartColor
          }]
        }
      });
  }

  private getReportByAction(): void{
    this.service.getFtpReports('action')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching ftp logs by action report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.actionsData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Actions",
            backgroundColor: this.chartColor
          }]
        }
      });
  }

  private getReportByIpAddress(): void{
    this.service.getFtpReports('ip_address')
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching ftp logs by ip address report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.ipData = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "IP Address",
            backgroundColor: this.chartColor
          }]
        }
      });
  }
}
