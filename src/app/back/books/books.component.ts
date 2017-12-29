import { Component, OnInit, ViewChild } from '@angular/core';
import { BOOKS } from '../../mock-data/mock-books'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Book } from '../../classes/book';
import { Router } from "@angular/router";

@Component({
  selector: 'lsc-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
  displayedColumns = ['select', 'id', 'title', 'description', 'published'];
  dataSource: MatTableDataSource<Book>;
  selection: SelectionModel<Book>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(BOOKS);
    this.selection = new SelectionModel<Book>(true, []);
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
    this.router.navigate([`book/${id}`]);
  }
}



