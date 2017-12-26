import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../../mock-data/mock-recipes';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  recipes = RECIPES

  constructor() { }

  ngOnInit() {
  }

}
