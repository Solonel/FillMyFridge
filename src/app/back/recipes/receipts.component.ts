import { Component, OnInit, ViewChild } from '@angular/core';
import { RECIPES } from '../../mock-data/mock-recipes';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Recipe } from '../../classes/Recipe';
import {Router} from "@angular/router";
@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  recipes = RECIPES

  displayedColumns = ['select', 'id', 'title', 'description', 'published'];
  dataSource: MatTableDataSource<Recipe>;
  selection: SelectionModel<Recipe>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router : Router) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(RECIPES);

    this.selection = new SelectionModel<Recipe>(true, []);
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

  toto(id) {
    console.log('toto');
    this.router.navigate([`receip/${id}`]);
  }

}