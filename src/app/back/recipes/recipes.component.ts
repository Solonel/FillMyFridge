import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Recipe } from '../../classes/Recipe';
import { Router } from "@angular/router";
import { RecipeService } from '../../services/recipe.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'lsc-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  displayedColumns = ['select', 'id', 'title', 'description', 'preparation', 'cook', 'readyin', 'published'];
  dataSource: MatTableDataSource<Recipe>;
  selection: SelectionModel<Recipe>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private recipeService: RecipeService, private languageService: LanguageService) {
    this.dataSource = new MatTableDataSource(this.recipes);
    this.selection = new SelectionModel<Recipe>(true, []);
  }

  /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  */
  ngOnInit() {
    this.getRecipes();
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Récupère les recettes
   */
  getRecipes() {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.dataSource.data = recipes;
      });
  }

  /**
   * Redirige vers l'ajout d'une recette
   */
  addRecipe() {
    this.router.navigate([`recipe/add`]);
  }

  /**
   * Permet de filtrer la liste
   * @param filterValue Valeur entrée dans le champ filtre
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Vérifie si tout est sélectionné
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** 
   * Selects all rows if they are not all selected; otherwise clear selection. 
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * Redirige vers la page de détail
   * @param id Identifiant de l'enregistrement
   */
  redirectOnDetail(id) {
    this.router.navigate([`recipe/${id}`]);
  }

}