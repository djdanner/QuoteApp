// Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// ReactiveX for Java Script (RxJS)
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

// App
import { Quote } from './quote';
import { MessageService } from './message.service';

//******************************************************************************
const httpOptions = {
  // zzz
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

//******************************************************************************
@Injectable()
export class QuoteService {
  //zzz
  //private tickerUrl = 'api/ticker';  // URL to web api
  private tickerUrl = 'https://api.coinmarketcap.com/v1/ticker/bitcoin';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // Functions
  // Private
  //***********************************************************************
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //***********************************************************************
  /** Log a QuoteService message with the MessageService */
  private log(message: string) {
    this.messageService.add('QuoteService: ' + message);
  }

  // Public
  //***********************************************************************
  /** POST: add a new symbol to the server */
  addQuote (symbol: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.tickerUrl, symbol, httpOptions).pipe(
      tap((symbol: Quote) => this.log(`added symbol w/ id=${symbol.id}`)),
      catchError(this.handleError<Quote>('addQuote'))
    );
  }

  //***********************************************************************
  /** DELETE: delete the symbol from the server */
  deleteQuote (symbol: Quote | number): Observable<Quote> {
    const id = typeof symbol === 'number' ? symbol : symbol.id;
    const url = `${this.tickerUrl}/${id}`;

    return this.http.delete<Quote>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted symbol id=${id}`)),
      catchError(this.handleError<Quote>('deleteQuote'))
    );
  }

  //***********************************************************************
  /** GET symbol by id. Will 404 if id not found */
  getQuote(id: number): Observable<Quote> {
    const url = `${this.tickerUrl}/${id}`;
    return this.http.get<Quote>(url).pipe(
      tap(_ => this.log(`fetched symbol id=${id}`)),
      catchError(this.handleError<Quote>(`getQuote id=${id}`))
    );
  }

  //***********************************************************************
  /** GET quoteList from the server */
  getQuotes (): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.tickerUrl)
      .pipe(
        tap(quoteList => this.log(`fetched quoteList`)),
        catchError(this.handleError('getQuotes', []))
      );
  }

  //***********************************************************************
  /* GET quoteList whose name contains search term */
  searchQuotes(term: string): Observable<Quote[]> {
    if (!term.trim()) {
      // if there is no search term, return empty symbol array.
      return of([]);
    }
    return this.http.get<Quote[]>(`api/quoteList/?name=${term}`).pipe(
      tap(_ => this.log(`found quoteList matching "${term}"`)),
      catchError(this.handleError<Quote[]>('searchQuotes', []))
    );
  }

  //***********************************************************************
  /** PUT: update the symbol on the server */
  updateQuote (symbol: Quote): Observable<any> {
    return this.http.put(this.tickerUrl, symbol, httpOptions).pipe(
      tap(_ => this.log(`updated symbol id=${symbol.id}`)),
      catchError(this.handleError<any>('updateQuote'))
    );
  }
}
