import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** FrontOffice Module */
import { AuthenticationComponent } from './front/authentication/authentication.component';
import { HomepageComponent } from './front/homepage/homepage.component';
/** BackOffice Module */
import { DashBoardComponent } from './back/dash-board/dash-board.component';
import { IngredientsComponent } from './back/ingredients/ingredients.component'
import { RecipesComponent } from './back/recipes/recipes.component';
import { BooksComponent } from './back/books/books.component';
import { RecipeComponent } from './back/recipe/recipe.component';
import { BookComponent } from './back/book/book.component';

const routes: Routes = [
    // Front
    { path: 'login', component: AuthenticationComponent },
    { path: '', component: HomepageComponent },

    // Back
    { path: 'administration', component: DashBoardComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'books', component: BooksComponent },
    { path: 'recipe/:id', component: RecipeComponent },
    { path: 'book/:id', component: BookComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
