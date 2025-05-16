import { Component, OnInit } from '@angular/core';
import { ApacheErrorLogService } from '../services/apache.error.log.service';
import { ApacheErrorLog } from '../models/ApacheErrorLog';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from '../shared/log-table/log-table.component';

@Component({
  selector: 'app-apache-error-log',
  imports: [CommonModule, LogTableComponent],
  standalone: true,
  templateUrl: './apache-error-log.component.html',
  styleUrl: './apache-error-log.component.css'
})
export class ApacheErrorLogComponent implements OnInit{
  rows: ApacheErrorLog[] = [];
  columns: string[] = ['id', 'ip', 'timestamp','method', 'url', 'message', 'status_code'];
  headers: string[] = ['Id', 'IP Address', 'Timestamp', 'Method', 'Action', 'URL', 'Message', 'Status Code'];
 
  constructor(private apacheErrorLogService: ApacheErrorLogService){

  }
  
  ngOnInit(): void {

    this.apacheErrorLogService.getApacheErrorLog().subscribe((data) => {
      this.rows = data;
    })
  }
}
