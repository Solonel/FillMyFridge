import { Component, OnInit, ViewChild } from '@angular/core';
import { UNITS } from '../../mock-data/mock-units';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Author } from '../../classes/Author';
import { Router } from "@angular/router";

import { AuthorService } from '../../services/author.service'

@Component({
  selector: 'lsc-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  displayedColumns = ['select', 'id', 'name', 'firstname'];
  dataSource: MatTableDataSource<Author>;
  selection: SelectionModel<Author>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private authorService: AuthorService) {
    this.dataSource = new MatTableDataSource(this.authors);
    this.selection = new SelectionModel<Author>(true, []);
  }

  ngOnInit() {
    this.getAuthors();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAuthors() {
    this.authorService.getAuthors()
      .subscribe(authors => {
        this.authors = authors;
        this.dataSource.data = authors;
      }
      );
  }

  addAuthor() {
    this.router.navigate([`author/add`]);
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
    this.router.navigate([`author/${id}`]);
  }

}
