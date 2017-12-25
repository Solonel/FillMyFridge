import { Component, OnInit } from '@angular/core';
import { INGREDIENTS } from '../../mock-data/mock-ingredient';

@Component({
  selector: 'lsc-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredients = INGREDIENTS

  constructor() { }

  ngOnInit() {
  }

}
