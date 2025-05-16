import { Component , Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-searcher',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css'
})

export class SearcherComponent {
  @Input() placeholder: string = "Search";
  @Output() search = new EventEmitter<string>();
  query: string = "";
  
  onSearch(): void {
    this.search.emit(this.query.trim());
  }
}
