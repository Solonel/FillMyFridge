import { Component, OnInit } from '@angular/core';
import { Book } from '../../classes/book';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'lsc-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
