import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../services/category.service'
import { Category } from '../../classes/category';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import 'rxjs/add/operator/finally';
import { Recipe } from '../../classes/Recipe';

@Component({
  selector: 'lsc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isLoading = true;
  categoryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      id: '',
      published: '',
      description: '',
      title: '',
      recipes: this.fb.array([new Recipe])
    }); 
  }

  ngOnInit() {
   this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryNo404(id)
      .finally(() => this.isLoading = false)
      .subscribe(category => {
        this.categoryForm.reset(category);
        this.setCategories(category.recipes);
        console.log(this.categoryForm)
      })
  }

  setCategories(categories: Recipe[]) {
    const categoryFGs = categories.map(recipe => this.fb.group(recipe));
    const categoryFormArray = this.fb.array(categoryFGs);
    this.categoryForm.setControl('recipes', categoryFormArray);
  
  }

  get recipes(): FormArray {
    return this.categoryForm.get('recipes') as FormArray;
  };

  goToList(): void {
    this.router.navigate([`categories`]);
  }

  save(): void {
    console.log("save", this.categoryForm.value);
    this.categoryService.updateCategory(this.categoryForm.value)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    console.log("delete", this.categoryForm.value);
    this.categoryService.deleteCategory(this.categoryForm.value)
      .subscribe(() => this.goToList());
  }

  addCategory() {
    this.categoryService.addCategory(this.categoryForm.value).subscribe(() => this.goToList());;
  }

}
