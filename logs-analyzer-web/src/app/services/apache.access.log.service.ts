import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApacheAccessLog } from '../models/ApacheAccessLog';

@Injectable({
  providedIn: 'root'
})
export class ApacheAccessLogService {
  private apiUrl = 'http://localhost:5000/api/logs/apache/access';

  constructor(private http: HttpClient) {}

  getApacheAccessLogs(): Observable<ApacheAccessLog[]> {
    return this.http.get<ApacheAccessLog[]>(this.apiUrl);
  }
}
