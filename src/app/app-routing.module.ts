import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** FrontOffice Module */
import { AuthenticationComponent } from './front/authentication/authentication.component';
import { HomepageComponent } from './front/homepage/homepage.component';
import { RegisterComponent } from './Front/register/register.component';
/** BackOffice Module */
import { DashBoardComponent } from './back/dash-board/dash-board.component';
import { IngredientComponent } from './back/ingredient/ingredient.component'
import { IngredientsComponent } from './back/ingredients/ingredients.component'
import { RecipesComponent } from './back/recipes/recipes.component';
import { RecipeComponent } from './back/recipe/recipe.component';
import { UnitComponent } from './back/unit/unit.component';
import { UnitsComponent } from './back/units/units.component';
// import { BooksComponent } from './back/books/books.component';
// import { BookComponent } from './back/book/book.component';
// import { AuthorComponent } from './back/author/author.component';
// import { AuthorsComponent } from './back/authors/authors.component';

const routes: Routes = [
    // Front
    { path: 'login', component: AuthenticationComponent },
    { path: '', component: HomepageComponent },
    { path: 'register', component: RegisterComponent },

    // Back
    { path: 'administration', component: DashBoardComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'ingredient/:id', component: IngredientComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipe/:id', component: RecipeComponent },
    // { path: 'books', component: BooksComponent },
    // { path: 'book/:id', component: BookComponent },
    { path: 'units', component: UnitsComponent },
    { path: 'unit/add', component: UnitComponent },
    { path: 'unit/:id', component: UnitComponent },
    // { path: 'authors', component: AuthorsComponent },
    // { path: 'author/add', component: AuthorComponent },
    // { path: 'author/:id', component: AuthorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
