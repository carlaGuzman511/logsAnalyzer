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

  getApacheErrorReportsByDates(start_date: string, end_date: string): Observable<LogReport>{
    return this.http.get<LogReport>(`${this.apiUrl}/reports?start_date=${start_date}&end_date=${end_date}`)
  }
}
