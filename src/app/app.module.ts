import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
<<<<<<< HEAD
import { AuthenticationComponent } from './Front/authentication/authentication.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AuthService } from './services/auth.service';
=======
import { ReceiptsComponent } from './backend/receipts/receipts.component';
import { BooksComponent } from './backend/books/books.component';
import { IngredientsComponent } from './backend/ingredients/ingredients.component';
import { BookComponent } from './backend/book/book.component';
import { ReceiptComponent } from './backend/receipt/receipt.component';
>>>>>>> fbf5166e648a0707fbf1fe248d6dd17d70e58690


const routes = [
  { path: 'login', component: AuthenticationComponent },
]

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    AuthenticationComponent,
    MainMenuComponent
=======
    ReceiptsComponent,
    BooksComponent,
    IngredientsComponent,
    BookComponent,
    ReceiptComponent
>>>>>>> fbf5166e648a0707fbf1fe248d6dd17d70e58690
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
