import { Component } from '@angular/core';

@Component({
  selector: 'app-log-report',
  imports: [],
  templateUrl: './log-report.component.html',
  styleUrl: './log-report.component.css'
})
export class LogReportComponent {
  pieChartData: [] = [];
  pierChartLabels: string[] = [];
  pieChartType: string = "";
  barCharData: [] = [];
  barChartLabels: string[] = [];
  barChartOptions: [] = [];
}
