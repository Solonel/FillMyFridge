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

  constructor(
    private shoppingListService: ShoppingListService,
    private fb: FormControl) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
  }
  //   id: number;
  //   userId: User;
  //   recipes: Recipe[];
  //   items: ShoppingListItem[];
  // }
  // export class ShoppingListItem {
  //   id: number;
  //   quantity: number
  //   unit: string;
  //   item: string;

}
