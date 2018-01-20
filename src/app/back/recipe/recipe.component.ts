import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Recipe, RecipeLocale } from '../../classes/recipe';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'lsc-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
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
   * Constructeur 
   * @param route La route utilisé pour accéder à l'enregistrement
   * @param router Le router pour faire une redirection
   * @param recipeService Le service recipe pour les traitements liés aux formulaires
   * @param fb Le formbuilder pour construire le formulaire react
   * @param languageService Le service language pour récupérer les informations de traduction
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private languageService: LanguageService) {
    this.createForm();
    // On initialise l objet 
    this.locales = {}
  }

  /**
   * Créé le formulaire React vide, nécessaire pour l'iniatilisation
   */
  createForm() {
    this.recipeForm = this.fb.group({
      id: null,
      author: null,
      rating: null,
      proportions: this.fb.array([]),
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
        this.recipeForm.patchValue({
          id: recipe.id,
          author: recipe.author,
          rating: recipe.rating,
          servings: recipe.servings,
          preparation: recipe.preparation,
          cook: recipe.cook,
          readyin: recipe.readyin,
          published: recipe.published,
        });
        this.setProportions(recipe.proportions)
        this.setLocaleGroup(recipe.locale);
      });
    } else {
      this.languageService.getNotImplementedLanguages([]).finally(() => {
        this.isLoading = false;
      }).subscribe(notImplementedLanguages => {
        this.notImplementedLanguages = notImplementedLanguages
      }, err => {
        console.log(err)
      });
    }
  }

  setProportions(proportions) {

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
      // On créé un objet temporaire pour créé le formgroup
      let obj = {
        description: locale[i].description,
        available: locale[i].available,
        title: locale[i].title,
        directions: this.setDirections(locale[i].directions)
      }
      this.locales[i] = this.fb.group(obj);

      localeIds.push(i);
    }

    // Récupère les langues nécessaires
    this.getLanguages(localeIds);

    // On set le formgroup créé sur le formulaire pour disposer des controles coté html
    this.recipeForm.setControl('locale', this.fb.group(this.locales));
  }

  setDirections(directions) {

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
      directions: this.fb.array([])
    }
    this.locales[newLanguageId] = this.fb.group(obj);
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
