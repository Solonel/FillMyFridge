import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';


@Component({
  selector: 'lsc-front-recipes',
  templateUrl: './front-recipes.component.html',
  styleUrls: ['./front-recipes.component.css']
})
export class FrontRecipesComponent implements OnInit {

  categories: Category[];
  

  constructor(private recipeService: RecipeService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

}
