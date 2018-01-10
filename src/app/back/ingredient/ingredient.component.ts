import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LOCATION_INITIALIZED } from '@angular/common';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient, IngredientLocale } from '../../classes/ingredient';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'lsc-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;
  isLoading = true;
  ingredientForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.ingredientForm = this.fb.group({
      id: null,
      locale: this.fb.array([]),
      icon: null
    });
  }

  ngOnInit() {
    this.getIngredient();
  }

  getIngredient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ingredientService.getIngredientNo404(id).finally(() => {
      this.isLoading = false;
      console.log("formgroup : ", this.ingredientForm)
    }).subscribe(ingredient => {
      if (ingredient) {
        this.ingredientForm.patchValue({
          id: ingredient.id,
          icon: ingredient.icon
        });
        this.setLocaleArray(ingredient.locale)
      }
    });
  }

  setLocaleArray(locale) {
    let localeFormGroups = [];

    for (let i in locale) {
      console.log("i", i ,"locale[i]" , locale[i]);
      localeFormGroups.push(this.fb.group({
        title: locale[i].id,// Id
        description: locale[i].description, // Petite description
        available: locale[i].servings
      }))
    }

    let localeFormArray = this.fb.array(localeFormGroups);
    this.ingredientForm.setControl('locale', localeFormArray);
    //   let recipeFormGroups = locale.map(locale => (
    //     // this.fb.group({
    //     //   id: recipe.id,// Id
    //     //   title: recipe.title,// Titre
    //     //   description: recipe.description, // Petite description
    //     //   servings: recipe.servings, // Nombre de personnes
    //     //   preparation: recipe.preparation, // Temps de préparation
    //     //   cook: recipe.cook,// Temps de cuisson
    //     //   readyin: recipe.readyin, // Prêt en combien de temps
    //     //   published: recipe.published, // Publié sur le site
    //     //   rating: recipe.rating,// Notation
    //     // })
    //   //)
    //   console.log(locale)
    // ));
  }

  goToList(): void {
    this.router.navigate([`ingredients`]);
  }

  save(): void {
    this.ingredientService.updateIngredient(this.ingredient)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    this.ingredientService.deleteIngredient(this.ingredient)
      .subscribe(() => this.goToList());
  }

  addIngredient(formData) {
    this.ingredientService.addIngredient(formData).subscribe(() => this.goToList());;
  }
}
