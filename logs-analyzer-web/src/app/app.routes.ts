import { Routes } from '@angular/router';
import { ApacheAccessReportComponent } from './apache-access-report/apache-access-report.component';
import { ApacheErrorReportComponent } from './apache-error-report/apache-error-report.component';
import { VsftpdReportComponent } from './vsftpd-report/vsftpd-report.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'apache-access-reports', component: ApacheAccessReportComponent },
    { path: 'apache-error-reports', component: ApacheErrorReportComponent },
    { path: 'ftp-reports', component: VsftpdReportComponent },
    { path: '', component: HomeComponent },
];
