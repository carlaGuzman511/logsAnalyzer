import { Component, OnInit } from '@angular/core';
import { ApacheAccessLogService } from '../services/apache.access.log.service';
import { ApacheAccessLog } from '../models/ApacheAccessLog';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from '../shared/log-table/log-table.component';

@Component({
  selector: 'app-apache-access-log',
  imports: [CommonModule, LogTableComponent],
  standalone: true,
  templateUrl: './apache-access-log.component.html',
  styleUrl: './apache-access-log.component.css'
})
export class ApacheAccessLogComponent implements OnInit{
  rows: ApacheAccessLog[] = [];
  headers: string[] = ['Id', 'IP Address', 'Timestamp', 'Method', 'Path', 'Status Code', 'User Agent'];
  columns: string[] = ['id', 'ip_address', 'timestamp', 'method', 'path', 'status_code', 'user_agent'];

  constructor(private apacheAccessLogService: ApacheAccessLogService){

  }

  ngOnInit(): void {
    this.apacheAccessLogService.getApacheAccessLogs().subscribe((data) => {
      this.rows = data;
    })  
  }
}
