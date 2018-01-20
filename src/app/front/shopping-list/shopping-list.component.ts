import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../../classes/shopping-list'
import { ShoppingListService } from "../../services/shopping-list.service";
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'lsc-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  newShoppingList: FormGroup;

  constructor(
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder) {
    this.createNewShoppingList();
  }

  ngOnInit() {
  };

  createNewShoppingList() {
    this.newShoppingList = this.fb.group({
      nbPeople: null,
      nbMeal: null,
    });
  };

  generate(formValues) {
    console.log(formValues);
  }
}
