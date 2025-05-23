import { Routes } from '@angular/router';
import { ApacheAccessReportComponent } from './apache-access-report/apache-access-report.component';
import { ApacheErrorReportComponent } from './apache-error-report/apache-error-report.component';
import { VsftpdReportComponent } from './vsftpd-report/vsftpd-report.component';
import { HomeComponent } from './home/home.component';
import { VsftpdComponent } from './vsftpd/vsftpd.component';
import { ApacheAccessLogComponent } from './apache-access-log/apache-access-log.component';
import { ApacheErrorLogComponent } from './apache-error-log/apache-error-log.component';

export const routes: Routes = [
    { path: 'apache-access-reports', component: ApacheAccessReportComponent },
    { path: 'apache-error-reports', component: ApacheErrorReportComponent },
    { path: 'ftp-reports', component: VsftpdReportComponent },
    { path: 'apache-access-logs', component: ApacheAccessLogComponent},
    { path: 'apache-error-logs', component: ApacheErrorLogComponent},
    { path: 'ftp-logs', component: VsftpdComponent},
    { path: '', component: HomeComponent },
];
