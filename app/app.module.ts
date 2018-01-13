// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

// Angular Support Tools
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// App
import { AppComponent } from './app.component';
import { QuoteListComponent } from './quoteList/quoteList.component';
import { QuoteService } from './quote.service';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuoteSearchComponent } from './symbol-search/symbol-search.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteListComponent,
    QuoteDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    QuoteSearchComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // zzz
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],

  providers: [
    QuoteService,
    MessageService,
    //MessageService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
