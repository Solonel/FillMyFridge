import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../classes/author';

@Component({
  selector: 'lsc-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;

  fetchingData = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private authorService: AuthorService) { }

  ngOnInit() {
    this.getAuthor();
  }

  getAuthor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.authorService.getAuthorNo404(id)
      .subscribe(author => { this.author = author; this.fetchingData = false; });
  }

  goToList(): void {
    this.router.navigate([`authors`]);
  }

  save(): void {
    console.log("save",this.author);
    this.authorService.updateAuthor(this.author)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    console.log("delete",this.author);
    this.authorService.deleteAuthor(this.author)
      .subscribe(() => this.goToList());
  }

  addAuthor(formData) {
    this.authorService.addAuthor(formData).subscribe(() => this.goToList());;
  }

}
