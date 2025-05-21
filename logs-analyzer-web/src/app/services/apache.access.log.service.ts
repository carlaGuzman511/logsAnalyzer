import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApacheAccessLog } from '../models/ApacheAccessLog';
import { LogReport } from '../models/LogReport';

@Injectable({
  providedIn: 'root'
})
export class ApacheAccessLogService {
  private apiUrl = 'http://localhost:5000/api/logs/apache/access';

  constructor(private http: HttpClient) {}

  getApacheAccessLogs(): Observable<ApacheAccessLog[]> {
    return this.http.get<ApacheAccessLog[]>(this.apiUrl);
  }

  getApacheAccessReports(field: string): Observable<LogReport>{
    return this.http.get<LogReport>(`${this.apiUrl}/reports?report=${field}`)
  }

  uploadApacheAccessLog(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
