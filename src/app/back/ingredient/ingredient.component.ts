import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LOCATION_INITIALIZED } from '@angular/common';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient, IngredientLocale } from '../../classes/ingredient';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import * as _ from "lodash";

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
    // TODO  Il faut récupérer tous les langages 
    return this.languageService.getDefaultLanguages();
  }

  getIngredient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ingredientService.getIngredientNo404(id).finally(() => {
      this.isLoading = false;
      console.log("this.ingredientForm", this.ingredientForm);
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
    let map: { [key: string]: FormGroup } = {};

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

      // TODO, on filtre le tableau des langues
      // On enleve celle existante dans le tableau de toutes les langues
      // Et on créé le tableau des langues de l ingredient pour pouvoir afficher correctement coté formulaire
    }

    let localeFormArray = this.fb.group(map);
    this.ingredientForm.setControl('locale', localeFormArray);
  }

  onSubmit() {
    console.log(this.ingredientForm.value);
  }
}
