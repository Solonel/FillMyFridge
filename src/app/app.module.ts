import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './dev-tool/dev-services/in-memory-data.service';
import { AngularMaterialModule } from './angular-material.module'

/**
* Front Component
*/
import { AuthenticationComponent } from './front/authentication/authentication.component';
import { FrontMenuComponent } from './front/front-menu/front-menu.component';
import { HomepageComponent } from './front/homepage/homepage.component';
import { RegisterComponent } from './Front/register/register.component';

/**
 * Back Component
 */
import { RecipesComponent } from './back/recipes/recipes.component';
// import { BooksComponent } from './back/books/books.component';
// import { BookComponent } from './back/book/book.component';
import { IngredientComponent } from './back/ingredient/ingredient.component';
import { IngredientsComponent } from './back/ingredients/ingredients.component';
import { DashBoardComponent } from './back/dash-board/dash-board.component';
import { BackMenuComponent } from './back/back-menu/back-menu.component';
import { RecipeComponent } from './back/recipe/recipe.component';
import { UnitComponent } from './back/unit/unit.component';
import { UnitsComponent } from './back/units/units.component';
//import { AuthorComponent } from './back/author/author.component';
//import { AuthorsComponent } from './back/authors/authors.component';

/**
 * Service
 */
import { AuthService } from './services/auth.service';
//import { AuthorService } from './services/author.service';
import { UnitService } from './services/unit.service';
import { IngredientService } from './services/ingredient.service';
import { RecipeService } from './services/recipe.service';
//import { BookService } from './services/book.service';

/**
 * Dev Component
 */
import { DevMenuComponent } from './dev-tool/dev-menu/dev-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    RecipesComponent,
    IngredientsComponent,
    //BooksComponent,
    //BookComponent,
    DashBoardComponent,
    BackMenuComponent,
    DevMenuComponent,
    FrontMenuComponent,
    RecipeComponent,
    HomepageComponent,
    UnitComponent,
    UnitsComponent,
    //AuthorComponent,
    //AuthorsComponent,
    IngredientComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule, BrowserModule, AppRoutingModule, FormsModule,
    BrowserModule, AppRoutingModule, FormsModule, AngularMaterialModule, BrowserAnimationsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    AuthService,
    //AuthorService, 
    //BookService,
    UnitService,
    IngredientService,
    RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
