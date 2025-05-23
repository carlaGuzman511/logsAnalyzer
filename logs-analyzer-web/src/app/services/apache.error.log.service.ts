import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApacheErrorLog } from '../models/ApacheErrorLog';
import { LogReport } from '../models/LogReport';

@Injectable({
  providedIn: 'root'
})
export class ApacheErrorLogService {
  private apiUrl = 'http://localhost:5000/api/logs/apache/error';

  constructor(private http: HttpClient) {}

  getApacheErrorLog(): Observable<ApacheErrorLog[]> {
    return this.http.get<ApacheErrorLog[]>(this.apiUrl);
  }

  getApacheErrorReports(field: string): Observable<LogReport>{
    return this.http.get<LogReport>(`${this.apiUrl}/reports?report=${field}`)
  }

  uploadApacheErrorLog(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
