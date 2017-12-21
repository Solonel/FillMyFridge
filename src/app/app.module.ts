import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ReceiptsComponent } from './backend/receipts/receipts.component';
import { BooksComponent } from './backend/books/books.component';
import { IngredientsComponent } from './backend/ingredients/ingredients.component';
import { BookComponent } from './backend/book/book.component';
import { ReceiptComponent } from './backend/receipt/receipt.component';


@NgModule({
  declarations: [
    AppComponent,
    ReceiptsComponent,
    BooksComponent,
    IngredientsComponent,
    BookComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
