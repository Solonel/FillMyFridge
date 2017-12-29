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
import { UnitComponent } from './back/unit/unit.component';
import { UnitsComponent } from './back/units/units.component';
import { AuthorComponent } from './back/author/author.component';
import { AuthorsComponent } from './back/authors/authors.component';

const routes: Routes = [
    // Front
    { path: 'login', component: AuthenticationComponent },
    { path: '', component: HomepageComponent },

    // Back
    { path: 'administration', component: DashBoardComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'ingredient/:id', component: IngredientsComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipe/:id', component: RecipeComponent },
    { path: 'books', component: BooksComponent },
    { path: 'book/:id', component: BookComponent },
    { path: 'units', component: UnitsComponent },
    { path: 'unit/:id', component: UnitComponent },
    { path: 'authors', component: AuthorsComponent },
    { path: 'author/:id', component: AuthorComponent }
   
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
