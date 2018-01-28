import { Component, OnInit, Input, Output, Injectable, EventEmitter } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Recipe, RecipeLocale, RecipeDirection } from '../../classes/recipe';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs/Observable';
import { Proportion } from '../../classes/proportion';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { UnitService } from '../../services/unit.service';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../classes/ingredient';

@Injectable()
export class ProportionValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'unit': new FormControl(),
      'ingredient': new FormControl(),
      'quantity': new FormControl(),
    });
  }
}

@Injectable()
export class RecipeDirectionValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'order': new FormControl(),
      'description': new FormControl(),
    });
  }
}

@Component({
  selector: 'lsc-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [
    RecipeDirectionValidatorService,
    ProportionValidatorService
  ],
})
export class RecipeComponent implements OnInit {
  /**
   * Colonne du tableau des proportions
   */
  proportionsColumns = ['quantity', 'unit', 'ingredient', 'actionsColumn'];

  /**
   * Colonne du tableau des directions
   */
  recipeDirectionColumns = ['order', 'description', 'actionsColumn'];

  /**
   * Source du tableau des proportions
   */
  dataSourceProportions: TableDataSource<Proportion>;

  /**
   * Source des tableaux de directions
   */
  directions: { [key: string]: TableDataSource<RecipeDirection> };

  /**
   * Permet de temporiser le html tant que le chargement de la recette n'est pas terminé
   */
  isLoading = true;

  /**
   * Si on ajoute un nouveau langage, il faut attendre que son ajout soit prêt
   */
  isNewLanguageReady = false;

  /**
   * Le formulaire Group, il est de la form du ce qu'on souhaite avoir en sortie vers la base de données
   */
  recipeForm: FormGroup;

  /**
   * Les langues de la recette implémentées
   */
  implementedLanguages = [];

  /**
   * Les langues de la recette non implémentées
   */
  notImplementedLanguages = [];

  /**
   *  Dictionnaire de langue de la recette
   */
  locales: { [key: string]: FormGroup };

  /**
   * Listes des ingredients pour les proportions
   */
  ingredients = [];

  /**
   * Listes des unités pour les proportions
   */
  units = []

  /**
   * Constructeur 
   * @param route La route utilisé pour accéder à l'enregistrement
   * @param router Le router pour faire une redirection
   * @param recipeService Le service recipe pour les traitements liés aux formulaires
   * @param fb Le formbuilder pour construire le formulaire react
   * @param languageService Le service language pour récupérer les informations de traduction
   * @param proportionValidatorService Le service de validation des proportions
   * @param RecipeDirectionValidatorService Le service de validation des directions
   * @param unitService Le service unit pour récupérer les unités
   * @param ingredientService Le service ingredient pour récupérer les ingredients
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private proportionValidatorService: ProportionValidatorService,
    private RecipeDirectionValidatorService: RecipeDirectionValidatorService,
    private unitService: UnitService,
    private ingredientService: IngredientService) {
    this.createForm();
    // On initialise les objets 
    this.locales = {}
    this.directions = {}
  }

  /**
   * Créé le formulaire React vide, nécessaire pour l'iniatilisation
   */
  createForm() {
    this.recipeForm = this.fb.group({
      id: null,
      author: null,
      rating: null,
      proportions: null,
      servings: null,
      preparation: null,
      cook: null,
      readyin: null,
      published: null,
      locale: null
    });
  }

  /**
   * Initialisation de la recette
   */
  ngOnInit() {
    this.getIngredients();
    this.getUnits();
    this.getRecipe();
  }

  /**
   * Récupère une recette par son Id
   */
  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // Si notre id est bien récupéré
    if (id !== 0) {
      // On récupère l'id que si il est correct
      this.recipeService.getRecipe(id).finally(() => {
        // On n'est plus en loading
        this.isLoading = false;
      }).subscribe(recipe => {
        if (recipe) {
          this.recipeForm.patchValue({
            id: recipe.id,
            author: recipe.author,
            rating: recipe.rating,
            servings: recipe.servings,
            preparation: recipe.preparation,
            cook: recipe.cook,
            readyin: recipe.readyin,
            published: recipe.published,
            proportions: recipe.proportions
          });
          // Gère les proportions
          this.setProportions(recipe.proportions ? recipe.proportions : []);
          // gère la langue
          this.setLocaleGroup(recipe.locale);
        }
      });
    } else {
      // Gère les proportions 
      this.setProportions([]);
      // Récupère les langues non implémentées 
      this.languageService.getNotImplementedLanguages([]).finally(() => {
        this.isLoading = false;
      }).subscribe(notImplementedLanguages => {
        this.notImplementedLanguages = notImplementedLanguages
      }, err => {
        console.log(err)
      });
    }
  }

  /**
   * Configure la source pour la table
   * @param proportions 
   */
  setProportions(proportions) {
    this.dataSourceProportions = new TableDataSource<any>(proportions, Proportion, this.proportionValidatorService);
    this.dataSourceProportions.datasourceSubject.subscribe(proportions => {
      this.recipeForm.patchValue({
        proportions: proportions
      });
    });
  }

  /**
   * Récupère les ingredients pour les proportions
   */
  getIngredients() {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  /**
   * Récupère les unités pour les proportions
   */
  getUnits() {
    this.unitService.getUnits().subscribe(units => {
      this.units = units;
    });
  }

  /**
   * Créé les FormGroup par langue
   * @param locale Liste id langue sur la recette
   */
  setLocaleGroup(locale) {
    // On créé un tableau temporaire pour avoir les id des langues de la recette
    let localeIds = [];

    // On parcours chaque objet de langue de la recette
    for (let i in locale) {
      // Un tableau vide si il n'y a pas de direction
      let directionsArray = locale[i].directions ? locale[i].directions : [];

      // On créé un objet temporaire pour créé le formgroup
      let obj = {
        description: locale[i].description,
        available: locale[i].available,
        title: locale[i].title,
        directions: directionsArray
      }
      // On gère les langues
      this.locales[i] = this.fb.group(obj);
      this.setDirections(i, directionsArray);
      localeIds.push(i);
    }

    // Récupère les langues nécessaires
    this.getLanguages(localeIds);

    // On set le formgroup créé sur le formulaire pour disposer des controles coté html
    this.recipeForm.setControl('locale', this.fb.group(this.locales));
  }

  /**
   * Configure le tableau de direction par langue
   * @param languageId 
   * @param directions 
   */
  setDirections(languageId, directions) {
    // On patch les values du formulaire
    this.locales[languageId].patchValue({
      directions: directions
    });
    // On gère la source des proportions
    let dataSourceRecipeDirection = new TableDataSource<any>(directions, RecipeDirection, this.RecipeDirectionValidatorService);
    dataSourceRecipeDirection.datasourceSubject.subscribe(directions => {
      this.recipeForm.get('locale').get(languageId).patchValue({
        directions: directions
      });
    });
    this.directions[languageId] = dataSourceRecipeDirection
  }

  /**
   * Récupère les langues implémentées et non implémentées de la recette
   * @param localeIds Le tableau d'id de langue
   */
  getLanguages(localeIds) {
    // On récupère les langues implémentées et non implémentées
    this.languageService.getImplementedLanguages(localeIds).subscribe(implementedLanguages => {
      this.implementedLanguages = implementedLanguages
    }, err => {
      console.log(err);
    });
    this.languageService.getNotImplementedLanguages(localeIds).subscribe(notImplementedLanguages => {
      this.notImplementedLanguages = notImplementedLanguages
    }, err => {
      console.log(err);
    });
  }

  /**
   * Prépare le formulaire pour la nouvelle langue
   * @param newLanguageId Identifiant de la nouvelle langue
   */
  addNewLanguage(newLanguageId) {
    let obj = {
      description: null,
      available: null,
      title: null,
      directions: null
    }
    // On créé le tableau de directions
    // On paramètre le formulaire de langue
    this.locales[newLanguageId] = this.fb.group(obj);
    this.setDirections(newLanguageId, []);
    this.recipeForm.setControl('locale', this.fb.group(this.locales));
    this.isNewLanguageReady = true;
  }

  /**
   * Redirige vers la liste des recettes
   */
  goToList(): void {
    this.router.navigate([`recipes`]);
  }

  /**
   * Redirige vers la recette avec l'identifiant cible
   * @param id id de la recette
   */
  goToRecipe(id): void {
    this.router.navigate([`recipe/${id}`])
  }

  /**
   * Met à jour la recette
   */
  update() {
    console.log(this.recipeForm.value)
    this.recipeService.updateRecipe(this.recipeForm.value)
      .subscribe(() => { this.getRecipe(); });
  }

  /**
   * Supprime la recette
   */
  delete() {
    this.recipeService.deleteRecipe(this.recipeForm.value)
      .subscribe(() => { this.goToList() });
  }

  /**
   * Ajoute une nouvelle recette
   */
  add() {
    this.recipeService.addRecipe(this.recipeForm.value)
      .subscribe(recipe => {
        this.goToRecipe(recipe.id);
      });
  }

}