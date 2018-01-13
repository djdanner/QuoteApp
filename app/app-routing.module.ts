// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { QuoteListComponent} from './quoteList/quoteList.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  // This causes the App to start at the Dashboard, since the default www link has not "path" appended to it.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: QuoteDetailsComponent },
  { path: 'quoteList', component: QuoteListComponent },
]

@NgModule({
  exports: [
    RouterModule
  ],

  imports: [
    RouterModule.forRoot(routes)
  ],
})

export class AppRoutingModule { }
