import { Component, OnInit } from '@angular/core';
import { ApacheAccessLogService } from '../services/apache.access.log.service';
import { ApacheAccessLog } from '../models/ApacheAccessLog';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from '../shared/log-table/log-table.component';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apache-access-log',
  imports: [CommonModule, LogTableComponent],
  standalone: true,
  templateUrl: './apache-access-log.component.html',
  styleUrl: './apache-access-log.component.css'
})
export class ApacheAccessLogComponent implements OnInit{
  rows: ApacheAccessLog[] = [];
  headers: string[] = ['Id', 'IP Address', 'Timestamp', 'Method', 'Path', 'Status Code', 'User Agent', 'Actions'];
  columns: string[] = ['id', 'ip_address', 'timestamp', 'method', 'path', 'status_code', 'user_agent', 'actions'];
  isLoading: boolean = false;
  title: string = "Apache Access Logs";

  constructor(private apacheAccessLogService: ApacheAccessLogService, private snackBar: MatSnackBar, private router: Router){

  }

  ngOnInit(): void {
    this.getApacheAccessLogs();
  }
  
  reload(): void {
    this.getApacheAccessLogs();
  }

  goToReports():void{
    this.router.navigate(['apache-access-reports']);
  }

  private getApacheAccessLogs(): void{
    this.isLoading = true;
    this.apacheAccessLogService.getApacheAccessLogs()
      .pipe(
        catchError(error => {
          this.snackBar.open(`Error fetching apache access logs ${error}`, 'Close', { duration: 2000 });
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe((data) => {
        this.rows = data;
      });
  }
}
