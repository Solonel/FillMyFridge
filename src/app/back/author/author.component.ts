import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'lsc-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    // this.getAuthor();
  }

  // getAuthor(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.heroService.getHero(id)
  //     .subscribe(hero => this.hero = hero);
  // }

  // goBack(): void {
  //   this.location.back();
  // }

  // save(): void {
  //   this.heroService.updateHero(this.hero)
  //     .subscribe(() => this.goBack());
  // }

}
