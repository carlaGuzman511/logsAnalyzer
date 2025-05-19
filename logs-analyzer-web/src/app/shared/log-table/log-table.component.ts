import { Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatFormFieldModule, 
    MatInputModule ],
    templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})

export class LogTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
  @Input() headers: string[] = [];
  @Input() columnTypes: {[key: string] : 'text' | 'date'} = {};

  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  filterValues: { [key: string]: any } = {};

  applyFilter(column: string, value: any): void {
    let formattedValue = value;
  
    if (value instanceof Date) {
      formattedValue = value.toLocaleDateString('en-GB'); // dd/mm/yyyy
    }
  
    this.filterValues[column] = formattedValue?.toString().toLowerCase() ?? '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  

  ngOnInit(): void {
    this.dataSource.data = this.rows;

    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return Object.keys(searchTerms).every(key => {
        const dataValue = data[key];
        const filterValue = searchTerms[key];
    
        if (!filterValue) return true;
    
        if (this.columnTypes[key] === 'date') {
          const parsedDate = new Date(dataValue);
          if (isNaN(parsedDate.getTime())) return false;
    
          const formatted = parsedDate.toLocaleDateString('en-GB'); // dd/mm/yyyy
          return formatted === filterValue;
        } else {
          return dataValue?.toString().toLowerCase().includes(filterValue);
        }
      });
    };    
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
