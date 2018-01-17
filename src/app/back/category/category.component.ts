import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../services/category.service'
import { LanguageService } from '../../services/language.service';
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
  isFormReady = false;
  categoryForm: FormGroup;
  langForm: FormGroup;
  locales: { [key: string]: FormGroup };

  categoryNotImplementedLanguages = [];
  // Catégories déjà ajoutées
  categoryImplementedLanguages = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private languageService: LanguageService) {
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      id: null,
      published: null,
      locale: null,
      recipes: this.fb.array([])
    });
    this.locales = {}
  }

  ngOnInit() {
    this.getCategory();
  }

  setLocaleGroup(locale) {
    // Key/Value de la collection de traduction
    // On créé un tableau temporaire pour avoir les id des langues de l ingredient
    let localeIds = [];

    for (let i in locale) {

      let obj = {
        description: locale[i].description,
        available: locale[i].available,
        title: locale[i].title
      }

      this.locales[i] = this.fb.group(obj);
      localeIds.push(i);
    }

    // Retourne une collection de languages implémentées
    this.languageService.getImplementedLanguages(localeIds).subscribe(implementedLanguages => {
      this.categoryImplementedLanguages = implementedLanguages;
    });
    this.languageService.getNotImplementedLanguages(localeIds).subscribe(notImplementedLanguages => {
      this.categoryNotImplementedLanguages = notImplementedLanguages;
    });
    let localeFormArray = this.fb.group(this.locales);
    this.categoryForm.setControl('locale', localeFormArray);
  }

  newLanguageSelected(newLanguageId) {
    let obj = {
      description: null,
      available: null,
      title: null,
    }
    this.locales[newLanguageId] = this.fb.group(obj);
    this.categoryForm.setControl('locale', this.fb.group(this.locales));
    this.isFormReady = true;
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
            published: category.published,
          });
          this.setLocaleGroup(category.locale);

          // this.setRecipeArray(category.recipes)
        } else {
          this.languageService.getNotImplementedLanguages([]).subscribe(notImplementedLanguages => {
            this.categoryNotImplementedLanguages = notImplementedLanguages;
          });
        }
      });

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
