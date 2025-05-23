import { Component } from '@angular/core';
import { VsftpdComponent } from '../vsftpd/vsftpd.component';
import { ApacheAccessLogComponent } from '../apache-access-log/apache-access-log.component';
import { ApacheErrorLogComponent } from '../apache-error-log/apache-error-log.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    VsftpdComponent, 
    ApacheAccessLogComponent, 
    ApacheErrorLogComponent,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){

  }

  goToApacheAccessLogs(){
    this.router.navigate(['apache-access-logs']);
  }
  goToApacheErrorLogs(){
    this.router.navigate(['apache-error-logs']);
  }
  goToFtpLogs(){
    this.router.navigate(['ftp-logs']);
  }
}
