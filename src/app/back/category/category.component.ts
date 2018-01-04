import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service'
import { Category } from '../../classes/category';
import * as _ from "lodash";

@Component({
  selector: 'lsc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  fetchingData = true;
  @Input() category: Category;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService) {


    this.createForm();
  }


  createForm() {
    this.categoryForm = this.fb.group(new Category());
  }


  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryNo404(id)
      .subscribe(category => { this.category = category; this.fetchingData = false; });
  }

  goToList(): void {
    this.router.navigate([`categories`]);
  }

  save(): void {
    console.log("save", this.category);
    this.categoryService.updateCategory(this.category)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    console.log("delete", this.category);
    this.categoryService.deleteCategory(this.category)
      .subscribe(() => this.goToList());
  }

  addCategory(formData) {
    this.categoryService.addCategory(formData).subscribe(() => this.goToList());;
  }

  removeItems(recipes) {
    recipes.selectedOptions.selected.map(item => {
      this.category.recipes = _.difference(this.category.recipes, [item.value]);
    });
    recipes.deselectAll();
  }

}
