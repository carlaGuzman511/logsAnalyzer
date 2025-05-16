import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApacheErrorLog } from '../models/ApacheErrorLog';

@Injectable({
  providedIn: 'root'
})
export class ApacheErrorLogService {
  private apiUrl = 'http://localhost:5000/api/logs/apache/error';

  constructor(private http: HttpClient) {}

  getApacheErrorLog(): Observable<ApacheErrorLog[]> {
    return this.http.get<ApacheErrorLog[]>(this.apiUrl);
  }
}
