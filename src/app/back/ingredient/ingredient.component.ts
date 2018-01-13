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
  isLoading = true;
  ingredientForm: FormGroup;
  availableLanguages = [];

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
      console.log(this.ingredientForm);
    }).subscribe(ingredient => {
      if (ingredient) {
        this.getAvailableLanguages(ingredient.locale);
        this.ingredientForm.patchValue({
          id: ingredient.id,
          icon: ingredient.icon
        });
        this.setLocaleGroup(ingredient.locale);
      }
    });
  }

  getAvailableLanguages(language) {
    console.log(language.locale);
    for (var lang in language.locale) {
      this.availableLanguages.push(lang);
    }
    console.log('availableLanguages', this.availableLanguages)
  }

  get localeFormArray(): FormArray {
    return this.ingredientForm.get('locale') as FormArray;
  }


  setLocaleGroup(locale) {
    let localeFormGroups = [];
    for (let i in locale) {
      localeFormGroups.push(this.fb.group({
        language: i,
        title: locale[i].title,
        description: locale[i].description,
        available: locale[i].available
      }))
    }
    let localeFormArray = this.fb.array(localeFormGroups);
    this.ingredientForm.setControl('locale', localeFormArray);
  }

  goToList(): void {
    this.router.navigate([`ingredients`]);
  }

  save(): void {
    // this.ingredientService.updateIngredient(this.ingredient)
    //   .subscribe(() => this.goToList());
  }

  delete(): void {
    // this.ingredientService.deleteIngredient(this.ingredient)
    //   .subscribe(() => this.goToList());
  }

  addIngredient(formData) {
    // this.ingredientService.addIngredient(formData).subscribe(() => this.goToList());;
  }
}
