import { Component, OnInit } from '@angular/core';
import { ApacheErrorLogService } from '../services/apache.error.log.service';
import { ApacheErrorLog } from '../models/ApacheErrorLog';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from '../shared/log-table/log-table.component';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apache-error-log',
  imports: [CommonModule, LogTableComponent],
  standalone: true,
  templateUrl: './apache-error-log.component.html',
  styleUrl: './apache-error-log.component.css'
})

export class ApacheErrorLogComponent implements OnInit{
  rows: ApacheErrorLog[] = [];
  columns: string[] = ['id', 'ip', 'timestamp','method', 'url', 'message', 'status_code', 'actions'];
  headers: string[] = ['Id', 'IP Address', 'Timestamp', 'Method', 'Action', 'URL', 'Message', 'Status Code', 'Actions'];
  isLoading: boolean = false;
  title: string = "Apache Error Logs";

  constructor(private apacheErrorLogService: ApacheErrorLogService, private snackBar: MatSnackBar, private router: Router){}
  
  ngOnInit(): void {
    this.getApacheErrorLogs();
  }

  reload(): void {
    this.getApacheErrorLogs();
  }

  goToReports(): void{
    this.router.navigate(['apache-error-reports']);
  }

  private getApacheErrorLogs():void{
    this.isLoading = true;
    this.apacheErrorLogService.getApacheErrorLog()
    .pipe(
      catchError((error) => {
        this.snackBar.open(`Error fetching apache error logs ${error}`, 'Close', { duration: 2000 });
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    )
    .subscribe((data) => {
      this.rows = data;
    })
  }

  handleFileUpload(file: File): void {
    this.isLoading = true;
    this.apacheErrorLogService.uploadApacheErrorLog(file).subscribe({
      next: (data) => {
        this.rows = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to upload apache error file', 'Close', { duration: 2000 });
        this.isLoading = false;
      }
    });
  }
}
