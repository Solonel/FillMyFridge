import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../services/category.service'
import { LanguageService } from '../../services/language.service';
import { Category, CategoryLocale } from '../../classes/category';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/finally';
import { Recipe } from '../../classes/Recipe';

@Component({
  selector: 'lsc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isLoading = true;

  isNewLanguageReady = false;

  categoryForm: FormGroup;

  langForm: FormGroup;

  /**
   *  Dictionnaire de langue de la catégorie
   */
  locales: { [key: string]: FormGroup };
  /**
  * Les langues de la catégorie non implémentés
  */
  categoryNotImplementedLanguages = [];

  /**
   * Les langues de la catégorie implémentés
   */
  categoryImplementedLanguages = [];

  /**
 * Constructeur 
 * @param route La route utilisé pour accéder à l'enregistrement
 * @param router Le router pour faire une redirection
 * @param categoryService Le service catégorie pour les traitements liés aux formulaires
 * @param fb Le formbuilder pour construire le formulaire react
 * @param languageService Le service language pour récupérer les informations de traduction
 */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private languageService: LanguageService) {
    // Initialisation du formulaire
    this.createForm();
    // Initialisation de l'objet contenant les langues
    this.locales = {}
  }

  /**
   * Initialisation du formulaire
   */
  createForm() {
    this.categoryForm = this.fb.group({
      id: null,
      published: null,
      locale: null,
      //recipes: this.fb.array([]) // VOIR SI ON LAISSE LES RECETTES ICI 
    });
  }

  /**
   * Initialisation de la catégorie
   */
  ngOnInit() {
    this.getCategory();
  }

  /**
   * Récupération de la catégorie depuis son id
   */
  getCategory(): void {
    // Récupération du paramètre présent dans la route
    const id = +this.route.snapshot.paramMap.get('id');
    // Appel au service catégorie pour récupérer la catégorie depuis l'id
    this.categoryService.getCategoryNo404(id)
      .finally(() => {
        // A la fin, le loading est terminé
        this.isLoading = false
      })
      .subscribe(category => {
        // On associe la catégorie retournée au formulaire react
        if (category) {
          this.categoryForm.patchValue({
            id: category.id,
            published: category.published,
          });
          // On récupère les langues déjà implémentées
          this.setLocaleGroup(category.locale);

          // this.setRecipeArray(category.recipes) // A VOIR AVEC LES RECETTES
        } else {
          // Si pas de catégorie retournée, on récupère la collection de language non implémentés
          // On passe alors en paramètre un tableau vide signifiant qu'il n'y a pas de langue déjà implémentées
          this.languageService.getNotImplementedLanguages([]).subscribe(notImplementedLanguages => {
            this.categoryNotImplementedLanguages = notImplementedLanguages;
          });
        }
      });

  }

  /**
   * Créé les FormGroup par langue existante
   * @param locale Liste des langues implémentées sur la catégorie
   */
  setLocaleGroup(locale) {
    // Key/Value de la collection de traduction
    // On créé un tableau temporaire pour avoir les id des langues de l ingredient
    let localeIds = [];

    // Pour chaque langue implémentée 
    // i est l'id de la langue
    for (let i in locale) {
      // On créé un objet temporaire pour créé le formgroup
      let obj = {
        description: locale[i].description,
        available: locale[i].available,
        title: locale[i].title
      }

      // On crée un FormGroup pour la langue
      this.locales[i] = this.fb.group(obj);

      // On stock les ids des langues implémentées
      localeIds.push(i);
    }

    // On récupère toutes les langues
    this.getLanguages(localeIds);

    // On ajoute les FormGroup des langues dans le control "locale" du formulaire de la catégorie
    this.categoryForm.setControl('locale', this.fb.group(this.locales));
  }

  /**
 * Récupère les langues implémentées et non implémentées de l'ingredient
 * @param localeIds Le tableau d'id de langue
 */
  getLanguages(localeIds) {
    // Appel au LanguageService pour récupérer les langues implémentées
    this.languageService.getImplementedLanguages(localeIds).subscribe(implementedLanguages => {
      this.categoryImplementedLanguages = implementedLanguages;
    });
    // Appel au LanguageService pour récupérer les langues non implémentées
    this.languageService.getNotImplementedLanguages(localeIds).subscribe(notImplementedLanguages => {
      this.categoryNotImplementedLanguages = notImplementedLanguages;
    });
  }

  /**
   * Création d'un formulaire d'ajout d'une nouvelle langue
   * @param newLanguageId Id de la langue à ajouter
   */
  addNewLanguage(newLanguageId) {
    let obj = {
      description: null,
      available: null,
      title: null,
    }
    this.locales[newLanguageId] = this.fb.group(obj);
    this.categoryForm.setControl('locale', this.fb.group(this.locales));
    this.isNewLanguageReady = true;
  }

  get recipeFormArray(): FormArray {
    return this.categoryForm.get('recipes') as FormArray;
  }



  setRecipeArray(recipes: Recipe[]) {
    let recipeFormGroups = recipes.map(recipe => (
      this.fb.group({
        id: recipe.id,// Id
        title: recipe.title,// Titre
        description: recipe.description, // Petite description
        servings: recipe.servings, // Nombre de personnes
        preparation: recipe.preparation, // Temps de préparation
        cook: recipe.cook,// Temps de cuisson
        readyin: recipe.readyin, // Prêt en combien de temps
        published: recipe.published, // Publié sur le site
        rating: recipe.rating,// Notation
      })
    ));

    let recipeFormArray = this.fb.array(recipeFormGroups);
    this.categoryForm.setControl('recipes', recipeFormArray);
  }

  goToList(): void {
    this.router.navigate([`categories`]);
  }
  /**
   * Redirige sur la catégorie passée en paramètre
   * @param id Id de la catégorie sur laquelle être redirigée
   */
  goToCategory(id): void {
    this.router.navigate([`category/${id}`]);
  }

  save(): void {
    console.log("save", this.categoryForm.value);
    this.categoryService.updateCategory(this.categoryForm.value)
      .subscribe(category => { this.getCategory(); });
  }

  delete(): void {
    console.log("delete", this.categoryForm.value);
    this.categoryService.deleteCategory(this.categoryForm.value)
      .subscribe(() => this.goToList());
  }

  addCategory() {
    console.log("add", this.categoryForm.value);
    this.categoryService.addCategory(this.categoryForm.value)
      .subscribe(category => { this.goToCategory(category.id) });;
  }

  removeRecipes(recipes) {
    recipes.selectedOptions.selected.map(item => {
      this.recipeFormArray.removeAt(this.recipeFormArray.value.findIndex(recipe => recipe.id === item.id))
    });
    recipes.deselectAll();
  }

}
