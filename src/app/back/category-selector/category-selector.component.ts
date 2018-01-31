import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';
import { LanguageService } from '../../services/language.service';
import * as _ from "lodash";

@Component({
  selector: 'lsc-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  /**
   * Valeur déjà selectionner
   */
  @Input() values = Array<Category>();

  /**
   * Sortie du composant, ici la liste des catégories selectionnées
   */
  @Output() onConfigCategory = new EventEmitter<Array<Category>>();

  /**
   * La valeur de la combo
   */
  category: Category;

  /**
    * Listes des catégories que l on peut choisir
    */
  selectCategory = Array<Category>();

  /**
   * Liste des catégories déjà choisies
   */
  categories = Array<Category>();

  constructor(
    private categoryService: CategoryService, private languageService: LanguageService) { }

  ngOnInit() {
    this.getCategories();
  }

  /**
   * On récupère toutes les catégories de l'application
   */
  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      // On récupère les catégories de l'appli et on les filtres pour n'afficher que celle qui nous interesse dans la combo
      // Dans le cas d'une recette par exemple, on enleve les catégories déjà présente sur la recette
      this.selectCategory = _.differenceBy(categories, this.values, 'id');
      // Les catégories déjà selectionnée sont celle passer en paramètre 
      this.categories = this.values;
    });
  }

  /**
   * On ajoute notre catégorie a la liste des catégories selectionnées
   * @param category 
   */
  addCategory(category: Category) {
    // On ajoute notre category au tableau des categories selectionnée
    this.categories.push(category);
    // On filtre nos propositions de combo par la liste des valeurs déjà selectionné.
    this.selectCategory = _.difference(this.selectCategory, this.categories);
    // Une fois la catégorie ajoutée, on vide la valeur de notre combo
    this.category = null;
    // On emet la modification de la liste de nos catégories
    this.onConfigCategory.emit(this.categories);
  }

  /**
   * Supprime une catégorie de la liste
   * @param category 
   */
  remove(category: Category): void {
    // Retrouve la catégorie que l'on souhaite enlever
    let index = this.categories.indexOf(category);
    // Si elle est trouvée
    if (index >= 0) {
      // On la remet dans le select pour la choisir a nouveau
      this.selectCategory.push(category);
      // On la dégage des valeurs selectionnées
      this.categories.splice(index, 1);
    }
    // On emet la modification de la liste de nos catégories
    this.onConfigCategory.emit(this.categories);
  }

}
