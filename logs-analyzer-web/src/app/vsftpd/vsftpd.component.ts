import { Component, OnInit } from '@angular/core';
import { FtpLogService } from '../services/ftp.service';
import { FtpLog } from '../models/FtpLog';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from '../shared/log-table/log-table.component';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vsftpd',
  imports: [CommonModule, LogTableComponent],
  templateUrl: './vsftpd.component.html',
  standalone: true,
  styleUrl: './vsftpd.component.css'
})
export class VsftpdComponent implements OnInit{
  rows: FtpLog[] = [];
  columns: string[] = ['id', 'timestamp', 'pid', 'user', 'action', 'ip_address', 'message', 'extra_message', 'actions'];
  headers: string[] = ['ID', 'Timestamp', 'PID', 'User', 'Action', 'IP Address', 'Message', 'Extra Message', 'Actions'];
  isLoading: boolean = false;
  title: string = "Ftp Logs";

  constructor(private ftpLogService: FtpLogService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.ftpLogService.getFtpLogs()
    .pipe(
      catchError((error) => {
        console.error("Error fetching ftp logs", error);
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
    this.ftpLogService.getFtpLogs()
    .pipe(
      catchError((error) => {
        console.error("Error fetching ftp logs", error);
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    )
    .subscribe((data) => {
      this.rows = data;
    });
  }
}
