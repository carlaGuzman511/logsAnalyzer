import { Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
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
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    ClipboardModule,
    MatProgressSpinner,
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatFormFieldModule, 
    MatTooltipModule, 
    MatInputModule ],
    templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})

export class LogTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
  @Input() headers: string[] = [];
  @Input() columnTypes: {[key: string] : 'text' | 'date'} = {};
  @Input() title: string = "";
  @Input() isLoading: boolean = false;

  @Output() reloadClicked = new EventEmitter<void>();
  @Output() reportsClicked = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<File>();

  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  filterValues: { [key: string]: any } = {};

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar){}

  applyFilter(column: string, value: any): void {
    let formattedValue = value;
  
    if (value instanceof Date) {
      formattedValue = value.toLocaleDateString('en-GB');
    }
  
    this.filterValues[column] = formattedValue?.toString().toLowerCase() ?? '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected.emit(file);
    }
  }  

  copyRow(row: any): void {
    const textToCopy = JSON.stringify(row, null, 2);
    this.clipboard.copy(textToCopy);
    this.snackBar.open('Copied to clipboard!', 'Close', { duration: 2000 });
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
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getHeader(column: string): string {
    const index = this.columns.indexOf(column);
    return this.headers[index] || column;
  }
}
