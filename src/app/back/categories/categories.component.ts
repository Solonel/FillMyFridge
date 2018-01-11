import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Category } from '../../classes/category';
import { Router } from "@angular/router";
import { CategoryService } from '../../services/category.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'lsc-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  displayedColumns = ['select', 'id', 'title', 'description','published'];
  dataSource: MatTableDataSource<Category>;
  selection: SelectionModel<Category>;
  defaultLanguageCategory = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private categoryService: CategoryService, private localeService:LocaleService) {
    this.dataSource = new MatTableDataSource(this.categories);
    this.selection = new SelectionModel<Category>(true, []);
  }

  ngOnInit() {
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => {
      //  this.defaultLanguageCategory.id = categories.id;

        this.categories = categories;
        this.dataSource.data = categories;
      }
      );
  }

  addCategory() {
    this.router.navigate([`category/add`]);
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
    this.router.navigate([`category/${id}`]);
  }

}
