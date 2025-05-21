import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FtpLog } from '../models/FtpLog';
import { LogReport } from '../models/LogReport';

@Injectable({
  providedIn: 'root'
})

export class FtpLogService {
  private apiUrl = 'http://localhost:5000/api/logs/ftp';

  constructor(private http: HttpClient) {}

  getFtpLogs(): Observable<FtpLog[]> {
    return this.http.get<FtpLog[]>(this.apiUrl);
  }

  getFtpReports(field: string): Observable<LogReport>{     
    return this.http.get<LogReport>(`${this.apiUrl}/reports?report=${field}`)
  }

  uploadFtpLogs(file: File): Observable<FtpLog[]> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<FtpLog[]>(this.apiUrl, formData);
  }
}
