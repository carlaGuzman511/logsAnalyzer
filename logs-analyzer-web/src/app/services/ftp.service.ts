import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FtpLog } from '../models/FtpLog';

@Injectable({
  providedIn: 'root'
})

export class FtpLogService {
  private apiUrl = 'http://localhost:5000/api/logs/ftp';

  constructor(private http: HttpClient) {}

  getFtpLogs(): Observable<FtpLog[]> {
    return this.http.get<FtpLog[]>(this.apiUrl);
  }
}
