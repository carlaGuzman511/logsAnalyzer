import { Component, OnInit } from '@angular/core';
import { ApacheAccessLogService } from '../services/apache.access.log.service';
import { ApacheAccessLog } from '../models/ApacheAccessLog';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from '../shared/log-table/log-table.component';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

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
  constructor(private apacheAccessLogService: ApacheAccessLogService){

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apacheAccessLogService.getApacheAccessLogs()
      .pipe(
        catchError(error => {
          console.error('Error fetching apache access logs', error);
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe((data) => {
        this.rows = data;
      });
  }
  
  reload(): void {
    this.isLoading = true;
    this.apacheAccessLogService.getApacheAccessLogs()
      .pipe(
        catchError(error => {
          console.error('Error fetching apache access logs', error);
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe((data) => {
        this.rows = data;
      });
  }
  
}
