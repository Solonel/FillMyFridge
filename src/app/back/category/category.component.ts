import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../services/category.service'
import { LocaleService } from '../../services/locale.service'
import { Category, CategoryLocale } from '../../classes/category';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/finally';
import { Recipe } from '../../classes/Recipe';

@Component({
  selector: 'lsc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isLoading = true;
  categoryForm: FormGroup;
  langForm: FormGroup;
  categoryAvailableLanguages = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private localeService: LocaleService) {
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      id: null,
      published: null,
      description: null,
      title: null,
      recipes: this.fb.array([])
    });
    //this.langForm = this.fb.group({
    //  title: null,
    //  description: null,
    //})
  }

  ngOnInit() {
    this.getCategory();
  }

  getAvailableLanguages(category) {
    console.log(category.locale);
    for (var lang in category.locale) {
      this.categoryAvailableLanguages.push(lang);
    }

  }

  get recipeFormArray(): FormArray {
    return this.categoryForm.get('recipes') as FormArray;
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryNo404(id)
      .finally(() => this.isLoading = false)
      .subscribe(category => {
        if (category) {
          this.categoryForm.patchValue({
            id: category.id,
            description: category.locale[this.localeService.getDefaultLanguage()].description,
            title: category.locale[this.localeService.getDefaultLanguage()].title,
            published: category.published
          });

          this.getAvailableLanguages(category);
          this.setRecipeArray(category.recipes)
        }
      })

  }

  setRecipeArray(recipes: Recipe[]) {
    let recipeFormGroups = recipes.map(recipe => (
      this.fb.group({
        id: recipe.id,// Id
        title: recipe.title,// Titre
        description: recipe.description, // Petite description
        servings: recipe.servings, // Nombre de personnes
        preparation: recipe.preparation, // Temps de préparation
        cook: recipe.cook,// Temps de cuisson
        readyin: recipe.readyin, // Prêt en combien de temps
        published: recipe.published, // Publié sur le site
        rating: recipe.rating,// Notation
      })
    ));

    let recipeFormArray = this.fb.array(recipeFormGroups);
    this.categoryForm.setControl('recipes', recipeFormArray);
  }

  goToList(): void {
    this.router.navigate([`categories`]);
  }

  save(): void {
    console.log("save", this.categoryForm.value);
    this.categoryService.updateCategory(this.categoryForm.value)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    console.log("delete", this.categoryForm.value);
    this.categoryService.deleteCategory(this.categoryForm.value)
      .subscribe(() => this.goToList());
  }

  addCategory() {
    console.log("add", this.categoryForm.value);
    this.categoryService.addCategory(this.categoryForm.value).subscribe(() => this.goToList());;
  }

  removeRecipes(recipes) {
    recipes.selectedOptions.selected.map(item => {
      this.recipeFormArray.removeAt(this.recipeFormArray.value.findIndex(recipe => recipe.id === item.id))
    });
    recipes.deselectAll();
  }

}
