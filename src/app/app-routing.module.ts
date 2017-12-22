import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import _ from "lodash";

/** FrontOffice Module */
import { AuthenticationComponent } from './front/authentication/authentication.component';
/** BackOffice Module */
import { DashBoardComponent } from './back/dash-board/dash-board.component';
import { IngredientsComponent } from './back/ingredients/ingredients.component'
import { ReceiptsComponent } from './back/receipts/receipts.component';
import { BooksComponent } from './back/books/books.component';

const routes: Routes = [
    // Front
    { path: 'login', component: AuthenticationComponent },
    // Back
    { path: 'administration', component: DashBoardComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'receipts', component: ReceiptsComponent },
    { path: 'books', component: BooksComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
