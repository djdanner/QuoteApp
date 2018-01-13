// Angular
import { Component, OnInit } from '@angular/core';

// App
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  quoteList: Quote[] = [];

  constructor(private QuoteService: QuoteService) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes(): void {
    this.QuoteService.getQuotes()
      .subscribe(quoteList => this.quoteList = quoteList.slice(0, 4));
  }
}
