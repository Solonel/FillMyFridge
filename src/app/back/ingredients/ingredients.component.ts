import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Ingredient } from '../../classes/Ingredient';
import { Router } from "@angular/router";
import { IngredientService } from '../../services/ingredient.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'lsc-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[];
  displayedColumns = ['select', 'id', 'title', 'description'];
  dataSource: MatTableDataSource<Ingredient>;
  selection: SelectionModel<Ingredient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private ingredientService: IngredientService, private languageService: LanguageService) {
    this.dataSource = new MatTableDataSource(this.ingredients);
    this.selection = new SelectionModel<Ingredient>(true, []);
  }

  /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  */
  ngOnInit() {
    this.getIngredients();
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Récupère les ingrédients
   */
  getIngredients() {
    this.ingredientService.getIngredients()
      .subscribe(ingredients => {
        this.ingredients = ingredients;
        this.dataSource.data = ingredients;
      });
  }

  /**
   * Redirige vers l'ajout d'un ingredient
   */
  addIngredient() {
    this.router.navigate([`ingredient/add`]);
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
    this.router.navigate([`ingredient/${id}`]);
  }

}
