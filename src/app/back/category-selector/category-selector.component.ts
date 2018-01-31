import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'lsc-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  @Input() filterCategories: string;
  @Output() onAddCategory = new EventEmitter<Category>();

  category : Category;

  /**
     * Listes des catégories
     */
  categories = Array<Category>();

  constructor(
    private categoryService: CategoryService, private languageService: LanguageService) { }

  ngOnInit() {
    this.getCategories();
  }

  /**
    * Récupère les catégories pour les proportions
    */
  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  addCategory(category:Category) {
    console.log(category)
    this.onAddCategory.emit(category);
  }

}
