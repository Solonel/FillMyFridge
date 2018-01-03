import { Component, OnInit } from '@angular/core';
//import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'lsc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  //providers: [
  //  // The locale would typically be provided on the root module of your application. We do it at
  //  // the component level here, due to limitations of our example generation script.
  //  {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  //  //{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  //  //{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  //],
})
export class RegisterComponent implements OnInit {

  constructor(private adapter: DateAdapter<any>) { }

  ngOnInit() {
    this.adapter.setLocale('fr');
  }

}
