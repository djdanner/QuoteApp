import { Component, OnInit } from '@angular/core';

// App
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quote-stream',
  templateUrl: './quote-stream.component.html',
  styleUrls: ['./quote-stream.component.css']
})
export class QuoteStreamComponent implements OnInit {
  quoteList: Quote[];

  constructor(private QuoteService: QuoteService) { }

  // Functions
  //*******************************************************************
  ngOnInit() {
    this.getQuotes();
  }

  //*******************************************************************
  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.QuoteService.addQuote({ name } as Quote)
      .subscribe(symbol => {
        this.quoteList.push(symbol);
      });
  }

  //*******************************************************************
  delete(symbol: Quote): void {
    this.quoteList = this.quoteList.filter(h => h !== symbol);
    this.QuoteService.deleteQuote(symbol).subscribe();
  }

  //*******************************************************************
  getQuotes(): void {
    this.QuoteService.getQuotes()
      .subscribe(quoteList => this.quoteList = quoteList);
  }
}
