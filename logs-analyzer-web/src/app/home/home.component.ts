import { Component } from '@angular/core';
import { VsftpdComponent } from '../vsftpd/vsftpd.component';
import { ApacheAccessLogComponent } from '../apache-access-log/apache-access-log.component';
import { ApacheErrorLogComponent } from '../apache-error-log/apache-error-log.component';

@Component({
  selector: 'app-home',
  imports: [
    VsftpdComponent, 
    ApacheAccessLogComponent, 
    ApacheErrorLogComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
