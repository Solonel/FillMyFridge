import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './dev-tool/dev-services/in-memory-data.service';

import {
  MatCheckboxModule, MatPaginatorModule, MatSortModule, MatTableModule,
  MatInputModule,
} from '@angular/material';

/**
* Front Component
*/
import { AuthenticationComponent } from './front/authentication/authentication.component';
import { FrontMenuComponent } from './front/front-menu/front-menu.component';
import { HomepageComponent } from './front/homepage/homepage.component';

/**
 * Back Component
 */
import { ReceiptsComponent } from './back/receipts/receipts.component';
import { BooksComponent } from './back/books/books.component';
import { IngredientsComponent } from './back/ingredients/ingredients.component';
import { BookComponent } from './back/book/book.component';
import { DashBoardComponent } from './back/dash-board/dash-board.component';
import { BackMenuComponent } from './back/back-menu/back-menu.component';
import { ReceiptComponent } from './back/receipt/receipt.component';

/**
 * Service
 */
import { AuthService } from './services/auth.service';

/**
 * Dev Component
 */
import { DevMenuComponent } from './dev-tool/dev-menu/dev-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ReceiptsComponent,
    ReceiptComponent,
    BooksComponent,
    IngredientsComponent,
    BookComponent,
    DashBoardComponent,
    BackMenuComponent,
    DevMenuComponent,
    FrontMenuComponent,
    HomepageComponent
  ],
  imports: [
    HttpClientModule, BrowserModule, AppRoutingModule, FormsModule, MatCheckboxModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule, 
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
