import { Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})

export class LogTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
  @Input() headers: string[] = [];

  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.dataSource.data = this.rows;
  }

  ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort; 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows'] && changes['rows'].currentValue) {
      this.dataSource.data = changes['rows'].currentValue;
    }
  }

  getHeader(column: string): string {
    const index = this.columns.indexOf(column);
    return this.headers[index] || column;
  }
}
