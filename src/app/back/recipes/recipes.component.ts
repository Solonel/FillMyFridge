import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Recipe } from '../../classes/Recipe';
import { Router } from "@angular/router";
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'lsc-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  displayedColumns = ['select', 'id', 'title', 'description', 'published'];
  dataSource: MatTableDataSource<Recipe>;
  selection: SelectionModel<Recipe>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private recipeService:RecipeService) {
    this.dataSource = new MatTableDataSource(this.recipes);
    this.selection = new SelectionModel<Recipe>(true, []);
  }

  ngOnInit() {
    this.getRecipes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRecipes() {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.dataSource.data = recipes;
      });
  }

  addRecipe() {
    this.router.navigate([`recipe/add`]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  redirectOnDetail(id) {
    this.router.navigate([`recipe/${id}`]);
  }

}