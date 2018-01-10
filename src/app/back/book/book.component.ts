import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../../classes/book';
import { SelectionModel } from '@angular/cdk/collections';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../classes/author';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../classes/Recipe';
import * as _ from "lodash";

@Component({
  selector: 'lsc-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book;
  authors: Author[];
  recipes: Recipe[];
  choosedRecipesList: Recipe[];
  fetchingData = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService, private authorService: AuthorService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.getAuthors();
    this.getRecipes();
    this.getBook();
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => {
        this.authors = authors;
      });
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBookNo404(id)
      .subscribe(book => {
        this.book = book;
        this.fetchingData = false;
      });
  }

  goToList(): void {
    this.router.navigate([`books`]);
  }

  save(): void {
    console.log("save", this.book);
    this.bookService.updateBook(this.book)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    console.log("delete", this.book);
    this.bookService.deleteBook(this.book)
      .subscribe(() => this.goToList());
  }

  addBook(formData) {
    this.bookService.addBook(formData).subscribe(() => this.goToList());;
  }

  addRecipesToBook(recipes) {
    recipes.selectedOptions.selected.map(item => {
      console.log(item.value)

      if (!this.choosedRecipesList) {
        this.choosedRecipesList = [item.value];
      } else {
        this.choosedRecipesList.push(item.value);
      }
      this.recipes = _.difference(this.recipes, this.choosedRecipesList);
    });
    recipes.deselectAll();
  }

}
