import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../../classes/book';
import { SelectionModel } from '@angular/cdk/collections';
import { BookService } from '../../services/book.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../classes/author';

@Component({
  selector: 'lsc-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book;
authors:Author[];
  fetchingData = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private bookService: BookService, private authorService: AuthorService) { }

    ngOnInit() {
      this.getAuthors();
      this.getBook();
    }
  
    getAuthors(): void {
      this.authorService.getAuthors()
        .subscribe(authors => { 
          this.authors = authors; 
        });
    }

    getBook(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.bookService.getBookNo404(id)
        .subscribe(book => { 
          this.book = book; 
          this.fetchingData = false; 
        });
    }
  
    goToList(): void {
      this.router.navigate([`books`]);
    }
  
    save(): void {
      console.log("save",this.book);
      this.bookService.updateBook(this.book)
        .subscribe(() => this.goToList());
    }
  
    delete(): void {
      console.log("delete",this.book);
      this.bookService.deleteBook(this.book)
        .subscribe(() => this.goToList());
    }
  
    addBook(formData) {
      this.bookService.addBook(formData).subscribe(() => this.goToList());;
    }

}
