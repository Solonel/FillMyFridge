import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient, IngredientLocale } from '../../classes/ingredient';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs/Observable';

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
   * Si on ajoute un nouveau langage, il faut attendre que son ajout soit prêt
   */
  isNewLanguageReady = false;

  /**
   * Le formulaire Group, il est de la form du ce qu'on souhaite avoir en sortie vers la base de données
   */
  ingredientForm: FormGroup;

  /**
   * Les langues de l'ingredient implémenté
   */
  implementedLanguage = [];

  /**
 * Les langues de l'ingredient non implémenté
 */
  notImplementedLanguage = [];

  /**
   *  Dictionnaire de langue de l'ingredient
   */
  locales: { [key: string]: FormGroup };

  /**
   * Constructeur 
   * @param route La route utilisé pour accéder à l'enregistrement
   * @param router Le router pour faire une redirection
   * @param ingredientService Le service ingredient pour les traitements liés aux formulaires
   * @param fb Le formbuilder pour construire le formulaire react
   * @param languageService Le service language pour récupérer les informations de traduction
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientService,
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
    this.ingredientForm = this.fb.group({
      id: null,
      locale: null,
      icon: null
    });
  }

  /**
   * Initialisation de l'ingrédient
   */
  ngOnInit() {
    this.getIngredient();
  }

  /**
   * Récupère un ingredient par son Id
   */
  getIngredient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // Si notre id est bien récupéré
    if (id !== 0) {
      // On récupère l'id que si il est correct
      this.ingredientService.getIngredient(id).finally(() => {
        // On n'est plus en loading
        this.isLoading = false;
      }).subscribe(ingredient => {
          this.ingredientForm.patchValue({
            id: ingredient.id,
            icon: ingredient.icon
          });
          this.setLocaleGroup(ingredient.locale);
      });
    } else {
      this.notImplementedLanguage = this.languageService.getNotImplementedLanguages([])
      this.isLoading = false;
    }
  }

  /**
   * Créé les FormGroup par langue
   * @param locale Liste langue sur les ingredients
   */
  setLocaleGroup(locale) {
    // On créé un tableau temporaire pour avoir les id des langues de l ingredient
    let localeIds = [];

    // On parcours chaque objet de langue de l'ingredient
    for (let i in locale) {
      // On créé un objet temporaire pour créé le formgroup
      let obj = {
        description: locale[i].description,
        available: locale[i].available,
        title: this.fb.group({
          singular: locale[i].title.singular,
          plural: locale[i].title.plural
        })
      }
      this.locales[i] = this.fb.group(obj);

      localeIds.push(i);
    }

    // On récupère les langues implémentées et non implémentées
    this.implementedLanguage = this.languageService.getImplementedLanguages(localeIds);
    this.notImplementedLanguage = this.languageService.getNotImplementedLanguages(localeIds);

    // On set le formgroup créé sur le formulaire pour disposer des controles coté html
    this.ingredientForm.setControl('locale', this.fb.group(this.locales));
  }

  /**
   * Prépare le formulaire pour la nouvelle langue
   * @param newLanguageId Identifiant de la nouvelle langue
   */
  addNewLanguage(newLanguageId) {
    let obj = {
      description: null,
      available: null,
      title: this.fb.group({
        singular: null,
        plural: null
      })
    }
    this.locales[newLanguageId] = this.fb.group(obj);
    this.ingredientForm.setControl('locale', this.fb.group(this.locales));
    this.isNewLanguageReady = true;
  }

  /**
   * Sauvegarde l'ingredient
   */
  save() {
    this.ingredientService.updateIngredient(this.ingredientForm.value)
      .subscribe(() => {});
  }

  /**
   * Supprime l'ingredient 
   */
  delete() {
    this.ingredientService.deleteIngredient(this.ingredientForm.value)
      .subscribe(() => {});
  }

  /**
   * Ajoute un nouvelle ingredient
   */
  add() {
    this.ingredientService.addIngredient(this.ingredientForm.value)
      .subscribe(ingredient => {
        this.router.navigate([`ingredient/${ingredient.id}`])
      });
  }
}
