import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ShoppingListService } from "../../services/shopping-list.service";
import { LanguageService } from '../../services/language.service';
import { ShoppingList, ShoppingListItem, ConfigurationShoppingList } from "../../classes/shopping-list";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/finally';
import { FormArray } from '@angular/forms/src/model';


@Component({
  selector: 'lsc-shopping-list-generator',
  templateUrl: './shopping-list-generator.component.html',
  styleUrls: ['./shopping-list-generator.component.css'],
})

export class ShoppingListGeneratorComponent implements OnInit {

  shoppingList: ShoppingList;

  isNewConfigReady: boolean = false;

  addedConfigs: ConfigurationShoppingList[];
  /**
   * Permet de temporiser le html tant que le chargement de la recette n'est pas terminé
   */
  isLoading = true;
  /**
   * Le formulaire Group, il est de la form du ce qu'on souhaite avoir en sortie vers la base de données
   */
  shoppingListForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder,
    private languageService: LanguageService) {
    // Initialisation du formulaire
    this.createForm();
    this.shoppingList = new ShoppingList;
  }

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Créé le formulaire React vide, nécessaire pour l'iniatilisation
   */
  createForm() {
    this.shoppingListForm = this.fb.group({
      id: null,
      userId: null,
      configs: this.fb.array([]),
      shoppings: null,
      cookings: null,
    });
  }

  initializeForm(): void {
    this.shoppingListForm.patchValue({
      id: null,
      userId: null,
    });
    this.addConfiguration();
  }

  get configs(): FormArray {
    return this.shoppingListForm.get('configs') as FormArray;
  };

  /**
   * Création d'un formulaire d'ajout d'une configuration sur la liste
   */
  getConfigurations() {
    const configsFG = this.shoppingList.configs.map(config => this.fb.group(config));
    const configFormArray = this.fb.array(configsFG);
    this.shoppingListForm.setControl('configs', configFormArray);
    this.isNewConfigReady = true;
  }

  addConfiguration() {
    this.configs.push(this.fb.group({
      nbPers: null, category: null, nbMeal: null
    }));
  }

  generateList(values) {
    this.shoppingListService.generateList(values);
  }
}
