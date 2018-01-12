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
      locale: null,
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
      console.log(this.ingredientForm)
    }).subscribe(ingredient => {
      if (ingredient) {
        this.ingredientForm.patchValue(ingredient);
      }
    });
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
