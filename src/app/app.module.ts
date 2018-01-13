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
import { RegisterComponent } from './front/register/register.component';
import { ProfileComponent } from './front/profile/profile.component';
import { FrontRecipesComponent } from './front/front-recipes/front-recipes.component';

/**
 * Back Component
 */
// import { BooksComponent } from './back/books/books.component';
// import { BookComponent } from './back/book/book.component';
//import { AuthorComponent } from './back/author/author.component';
//import { AuthorsComponent } from './back/authors/authors.component';
import { DashBoardComponent } from './back/dash-board/dash-board.component';
import { BackMenuComponent } from './back/back-menu/back-menu.component';
import { IngredientComponent } from './back/ingredient/ingredient.component';
import { IngredientsComponent } from './back/ingredients/ingredients.component';
import { RecipeComponent } from './back/recipe/recipe.component';
import { RecipesComponent } from './back/recipes/recipes.component';
import { UnitComponent } from './back/unit/unit.component';
import { UnitsComponent } from './back/units/units.component';
import { CategoryComponent } from './back/category/category.component';
import { CategoriesComponent } from './back/categories/categories.component';
import { UsersComponent } from './back/users/users.component';
import { UserComponent } from './back/user/user.component';
/**
 * Service
 */
import { AuthService } from './services/auth.service';
import { UnitService } from './services/unit.service';
import { IngredientService } from './services/ingredient.service';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
//import { BookService } from './services/book.service';
//import { AuthorService } from './services/author.service';

/**
 * Dev Component
 */
import { DevMenuComponent } from './dev-tool/dev-menu/dev-menu.component';
import { UserService } from './services/user.service';
import { LocaleService } from './services/locale.service';

/**
 * Pipe
 */
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DevMenuComponent,
    AuthenticationComponent,
    HomepageComponent,
    RegisterComponent,
    ProfileComponent,
    FrontMenuComponent,
    FrontRecipesComponent,
    //BooksComponent,
    //BookComponent,
    DashBoardComponent,
    BackMenuComponent,
    RecipeComponent,
    RecipesComponent,
    UnitComponent,
    UnitsComponent,
    UsersComponent,
    UserComponent,
    //AuthorComponent,
    //AuthorsComponent,
    IngredientsComponent,
    IngredientComponent,
    CategoryComponent,
    CategoriesComponent, KeysPipe
  ],
  imports: [
    HttpClientModule, BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule,
    BrowserModule, AppRoutingModule, AngularMaterialModule, BrowserAnimationsModule,
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
    UserService,
    CategoryService,
    UnitService,
    IngredientService,
    LocaleService,
    RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
