import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VsftpdComponent } from './vsftpd/vsftpd.component';
import { ApacheAccessLogComponent } from './apache-access-log/apache-access-log.component';
import { ApacheErrorLogComponent } from './apache-error-log/apache-error-log.component';
import { VsftpdReportComponent } from './vsftpd-report/vsftpd-report.component';
import { ApacheAccessReportComponent } from './apache-access-report/apache-access-report.component';
import { ApacheErrorReportComponent } from './apache-error-report/apache-error-report.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatPaginatorModule, 
    CommonModule, 
    RouterOutlet, 
    VsftpdComponent, 
    ApacheAccessLogComponent, 
    ApacheErrorLogComponent,
    ApacheAccessReportComponent,
    ApacheErrorReportComponent,
    VsftpdReportComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
