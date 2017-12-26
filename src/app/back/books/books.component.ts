import { Component, OnInit } from '@angular/core';
import { BOOKS } from '../../mock-data/mock-books'


@Component({
  selector: 'lsc-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
 
  books = BOOKS;

  constructor() { }

  ngOnInit() {

    console.log(this.books);
  }
 
}



