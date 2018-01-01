import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../classes/ingredient';

@Component({
  selector: 'lsc-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;
  fetchingData = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientService) { }

  ngOnInit() {
    this.getIngredient();
  }

  getIngredient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ingredientService.getIngredientNo404(id)
      .subscribe(Ingredient => { 
        this.ingredient = Ingredient; 
        this.fetchingData = false; 
        console.log(this.ingredient)
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
