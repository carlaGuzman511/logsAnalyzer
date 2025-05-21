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
  data: ChartData<'bar'> = {
      labels: [],
      datasets: [{
        data: [],
        label: "Apache Error Logs of the Last 30 Days",
        backgroundColor: this.chartColor
      }
    ]};
  chartType: ChartType = 'bar';
    
  
  constructor(private service: ApacheErrorLogService, private snackBar: MatSnackBar){
      
  }
  
  ngOnInit(): void {
    this.getReportByDates();  
  }

  private getReportByDates(): void{
    let start_date = new Date();
    start_date.setDate(start_date.getDate() - 30);
    let end_date = new Date();
    this.service.getApacheErrorReportsByDates(start_date.toLocaleDateString('en-GB'), end_date.toLocaleDateString('en-GB'))
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache error logs of the last 30 days report, ${error}`, 'Close', { duration: 2000 });
          return of({data: [], labels: []});
        }),
      )
      .subscribe((report: LogReport) => {
        this.data = {
          labels: report.labels,
          datasets: [{
            data: report.data,
            label: "Timestamp",
            backgroundColor: this.chartColor
          }]
        }
      });
  }
}
