import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======

>>>>>>> 90bddc3a8c8ab27ee948504cc3653c57db709a26
import {
  MatCheckboxModule, MatPaginatorModule, MatSortModule, MatTableModule,
  MatInputModule,
} from '@angular/material';

/**
* Front Component
*/
import { AuthenticationComponent } from './front/authentication/authentication.component';
import { FrontMenuComponent } from './front/front-menu/front-menu.component';

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
    BooksComponent,
    IngredientsComponent,
    BookComponent,
    DashBoardComponent,
    BackMenuComponent,
    DevMenuComponent,
    FrontMenuComponent,
<<<<<<< HEAD
    ReceiptComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule,
    MatCheckboxModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule,BrowserAnimationsModule
=======
>>>>>>> 90bddc3a8c8ab27ee948504cc3653c57db709a26
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
