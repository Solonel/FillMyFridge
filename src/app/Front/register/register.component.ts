import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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

  registerForm: FormGroup;

  constructor(private adapter: DateAdapter<any>, private formBuidler: FormBuilder) { }

  ngOnInit() {
    this.adapter.setLocale('fr');
    this.registerForm = this.formBuidler.group({
      id:"",
      gender: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  }

}
