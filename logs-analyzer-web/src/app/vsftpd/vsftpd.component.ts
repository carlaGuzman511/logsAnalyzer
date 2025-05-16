import { Component, OnInit } from '@angular/core';
import { FtpLogService } from '../services/ftp.service';
import { FtpLog } from '../models/FtpLog';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from '../shared/log-table/log-table.component';

@Component({
  selector: 'app-vsftpd',
  imports: [CommonModule, LogTableComponent],
  templateUrl: './vsftpd.component.html',
  standalone: true,
  styleUrl: './vsftpd.component.css'
})
export class VsftpdComponent implements OnInit{
  rows: FtpLog[] = [];
  columns: string[] = ['id', 'timestamp', 'pid', 'user', 'action', 'ip_address', 'message', 'extra_message'];
  headers: string[] = ['ID', 'Timestamp', 'PID', 'User', 'Action', 'IP Address', 'Message', 'Extra Message'];

  constructor(private ftpLogService: FtpLogService){}
  ngOnInit(): void {
    this.ftpLogService.getFtpLogs().subscribe((data) => {
      this.rows = data;
    });
  }
}
