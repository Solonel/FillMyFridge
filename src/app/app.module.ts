import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AuthenticationComponent } from './front/authentication/authentication.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AuthService } from './services/auth.service';
import { ReceiptsComponent } from './back/receipts/receipts.component';
import { BooksComponent } from './back/books/books.component';
import { IngredientsComponent } from './back/ingredients/ingredients.component';
import { BookComponent } from './back/book/book.component';
import { ReceiptComponent } from './back/receipt/receipt.component';


const routes = [
  { path: 'login', component: AuthenticationComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MainMenuComponent,
    ReceiptsComponent,
    BooksComponent,
    IngredientsComponent,
    BookComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
