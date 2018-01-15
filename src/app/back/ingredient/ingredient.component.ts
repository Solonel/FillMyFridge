import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LOCATION_INITIALIZED } from '@angular/common';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient, IngredientLocale } from '../../classes/ingredient';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import * as _ from "lodash";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'lsc-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  /**
  * Permet de temporiser le html tant que le chargement de l ingredient n'est pas terminé
  */
  isLoading = true;

  /**
   * Le formulaire Group, il est de la form du ce qu'on souhaite avoir en sortie vers la base de données
   */
  ingredientForm: FormGroup;
  /**
   * Contient toutes les langues,
   * Il faut tout les languages pour pouvoir ajouter une traduction
   */

  allLanguages = [];

  /**
   * Les langues de l'ingredient filtré par celle qui sont présentes
   */
  ingredientLanguage = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientService, private fb: FormBuilder, private languageService: LanguageService) {
    this.createForm();
  }

  createForm() {
    this.ingredientForm = this.fb.group({
      id: null,
      locale: null,
      icon: null
    });
  }

  ngOnInit() {
    this.allLanguages = this.getLanguages();
    this.getIngredient();
  }

  getLanguages(): Object[] {
    return this.languageService.getDefaultLanguages()
  }

  getIngredient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ingredientService.getIngredient(id).finally(() => {
      this.isLoading = false;
    }).subscribe(ingredient => {
      if (ingredient) {
        this.ingredientForm.patchValue({
          id: ingredient.id,
          icon: ingredient.icon
        });
        this.setLocaleGroup(ingredient.locale);
      }
    });
  }

  setLocaleGroup(locale) {
    // Key/Value de la collection de traduction
    let map: { [key: string]: FormGroup } = {};
    // On créé un tableau temporaire pour avoir les id des langues de l ingredient
    let locales = [];

    for (let i in locale) {

      let obj = {
        description: locale[i].description,
        available: locale[i].available,
        title: this.fb.group({
          singular: locale[i].title.singular,
          plural: locale[i].title.plural
        })
      }

      map[i] = this.fb.group(obj);
      locales.push(i);
    }

    let localeFormArray = this.fb.group(map);
    this.ingredientForm.setControl('locale', localeFormArray);

    this.filterLanguage(locales)
  }

  filterLanguage(locales) {
    this.allLanguages.map(l => {
      let exist = locales.find(function (element) {
        return element === l.id;
      });
      if (exist) {
        this.ingredientLanguage.push(l)
      }
    })

    // On filtre les langues existantes pour ne pouvoir ajouter que elle
    this.allLanguages = _.difference(this.allLanguages, this.ingredientLanguage)
  }

  goToList(): void {
    this.router.navigate([`ingredients`]);
  }

  save() {
    this.ingredientService.updateIngredient(this.ingredientForm.value)
      .subscribe(() => this.goToList());
  }

  delete() {
    this.ingredientService.deleteIngredient(this.ingredientForm.value)
      .subscribe(() => this.goToList());
  }

  add() {
    this.ingredientService.addIngredient(this.ingredientForm.value)
      .subscribe(ingredient => {
        this.ingredientForm.patchValue({
          id: ingredient.id
        });
      });
  }
}
