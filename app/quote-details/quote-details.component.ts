// Angular
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// App
import { Quote } from '../quote';
import { QuoteService }  from '../quote.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit {

  @Input() symbol: Quote;

  constructor(
    private route: ActivatedRoute,
    private QuoteService: QuoteService,
    private location: Location
  ) {}

  // Functions
  //*****************************************************************
  ngOnInit(): void {
    this.getQuote();
  }

  //*****************************************************************
  // Get the details of a specific Quote.
  getQuote(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.QuoteService.getQuote(id)
      .subscribe(symbol => this.symbol = symbol);
  }

  //*****************************************************************
  // Return to the previous page.
  goBack(): void {
    this.location.back();
  }

  //*****************************************************************
  // Save any changes the User made before executing goBack().
  save(): void {
     this.QuoteService.updateQuote(this.symbol)
       .subscribe(() => this.goBack());
   }
 }
