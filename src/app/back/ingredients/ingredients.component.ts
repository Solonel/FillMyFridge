import { Component, OnInit, ViewChild } from '@angular/core';
import { INGREDIENTS } from '../../mock-data/mock-ingredients';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Ingredient } from '../../classes/Ingredient';
import { Router } from "@angular/router";

@Component({
  selector: 'lsc-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  displayedColumns = ['select', 'id', 'title', 'description'];
  dataSource: MatTableDataSource<Ingredient>;
  selection: SelectionModel<Ingredient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(INGREDIENTS);
    this.selection = new SelectionModel<Ingredient>(true, []);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.router.navigate([`ingredient/${id}`]);
  }

}
