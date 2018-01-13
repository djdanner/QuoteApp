import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import {
   debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

//******************************************************************************
@Component({
  selector: 'app-symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: [ './symbol-search.component.css' ]
})
export class QuoteSearchComponent implements OnInit {

  // searchTerms is as an RxJS Subject.
  private searchTerms = new Subject<string>();

  quoteList$: Observable<Quote[]>;

  constructor(private QuoteService: QuoteService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.quoteList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.QuoteService.searchQuotes(term)),
    );
  }
}
