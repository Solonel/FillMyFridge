import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ShoppingListService } from "../../services/shopping-list.service";
import { LanguageService } from '../../services/language.service';
import { ShoppingList, ShoppingListItem, ConfigurationShoppingList } from "../../classes/shopping-list";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/finally';

import { TableDataSource, ValidatorService } from 'angular4-material-table';


@Injectable()
export class ConfigurationValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'nbPers': new FormControl(),
      'category': new FormControl(),
      'nbMeal': new FormControl(),
    });
  }
}

@Component({
  selector: 'lsc-shopping-list-generator',
  templateUrl: './shopping-list-generator.component.html',
  styleUrls: ['./shopping-list-generator.component.css'],
  providers: [
    { provide: ValidatorService, useClass: ConfigurationValidatorService }
  ],
})

export class ShoppingListGeneratorComponent implements OnInit {

  displayedColumns = ['nbPers', 'category', 'nbMeal', 'actionsColumn'];

  dataSource: TableDataSource<ConfigurationShoppingList>;

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
    private configurationValidatorService: ValidatorService,
    private languageService: LanguageService) {
    // Initialisation du formulaire
    this.createForm();
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
      configs: null,
      shoppings: null,
      cookings: null,
    });
  }

  initializeForm(): void {
    this.shoppingListForm.patchValue({
      id: null,
      userId: null,
    });

    this.setConfigurations([]);
  }

  setConfigurations(config) {
    this.dataSource = new TableDataSource<any>(config, ConfigurationShoppingList, this.configurationValidatorService);
    this.dataSource.datasourceSubject.subscribe(configs => {
      this.shoppingListForm.patchValue({
        configs: configs
      });
    });
  };

  generateList(values){
    this.shoppingListService.generateList(values);
  }
}
