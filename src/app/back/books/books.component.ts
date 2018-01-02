import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Book } from '../../classes/book';
import { Router } from "@angular/router";
import { BookService } from '../../services/book.service';

@Component({
  selector: 'lsc-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];
  displayedColumns = ['select', 'id', 'title', 'description', 'published'];
  dataSource: MatTableDataSource<Book>;
  selection: SelectionModel<Book>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private bookService: BookService) {
    this.dataSource = new MatTableDataSource(this.books);
    this.selection = new SelectionModel<Book>(true, []);
  }

  ngOnInit() {
    this.getBooks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getBooks() {
    this.bookService.getBooks()
      .subscribe(books => {
        this.books = books;
        this.dataSource.data = books;
      }
      );
  }

  addBook() {
    this.router.navigate([`book/add`]);
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



