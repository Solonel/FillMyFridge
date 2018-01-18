import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'lsc-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  /**
  * Permet de temporiser le html tant que le chargement de la langue n'est pas terminé
  */
  isLoading = true;

  /**
   * Si on ajoute un nouveau langage, il faut attendre que son ajout soit prêt
   */
  isNewLanguageReady = false;

  /**
   * Le formulaire Group, il est de la form du ce qu'on souhaite avoir en sortie vers la base de données
   */
  languageForm: FormGroup;

  /**
   * Les langues de la langue  implémenté
   */
  implementedLanguages = [];

  /**
 * Les langues de la langue non implémenté
 */
  notImplementedLanguages = [];

  /**
   *  Dictionnaire de langue de la langue
   */
  locales: { [key: string]: FormGroup };

  /**
   *  Savoir si le langue existe
   */
  languageExist: boolean

  /**
   * Constructeur 
   * @param route La route utilisé pour accéder à l'enregistrement
   * @param router Le router pour faire une redirection
   * @param fb Le formbuilder pour construire le formulaire react
   * @param languageService Le service language pour récupérer les informations de traduction
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private languageService: LanguageService) {
    this.createForm();
    // On initialise l objet 
    this.locales = {}
    this.languageExist = false;
  }

  /**
   * Créé le formulaire React vide, nécessaire pour l'iniatilisation
   */
  createForm() {
    this.languageForm = this.fb.group({
      id: null,
      locale: null,
      flag: null
    });
  }

  /**
   * Initialisation de la langue
   */
  ngOnInit() {
    this.getLanguage();
  }

  /**
   * Récupère un langage par son Id
   */
  getLanguage(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // Si notre id est bien récupéré
    console.log(id)
    if (id) {
      // On récupère l'id que si il est correct
      this.languageService.getLanguage(id).finally(() => {
        // On n'est plus en loading
        this.isLoading = false;
      }).subscribe(language => {
        this.languageForm.patchValue({
          id: language.id,
          flag: language.flag
        });
        this.setLocaleGroup(language.locale);
        this.languageExist = true;
      });
    } else {
      this.languageService.getNotImplementedLanguages([]).finally(() => {
        this.isLoading = false;
      }).subscribe(notImplementedLanguages => {
        this.notImplementedLanguages = notImplementedLanguages;
        this.languageExist = false;
      }, err => {
        console.log(err)
      });
    }
  }

  /**
   * Créé les FormGroup par langue
   * @param locale Liste langue sur la langue
   */
  setLocaleGroup(locale) {
    // On créé un tableau temporaire pour avoir les id des langues de la langue
    let localeIds = [];

    // On parcours chaque objet de langue de la langue
    for (let i in locale) {
      // On créé un objet temporaire pour créé le formgroup
      let obj = {
        label: locale[i].label
      }
      this.locales[i] = this.fb.group(obj);

      localeIds.push(i);
    }

    // Récupère les langues nécessaires
    this.getLanguages(localeIds);

    // On set le formgroup créé sur le formulaire pour disposer des controles coté html
    this.languageForm.setControl('locale', this.fb.group(this.locales));
  }

  /**
   * Récupère les langues implémentées et non implémentées de l'ingredient
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
      label: null
    }
    this.locales[newLanguageId] = this.fb.group(obj);
    this.languageForm.setControl('locale', this.fb.group(this.locales));
    this.isNewLanguageReady = true;
  }

  /**
   * Redirige vers la liste des ingredients
   */
  goToList(): void {
    this.router.navigate([`languages`]);
  }

  /**
   * Redirige vers la langue avec l'identifiant cible
   * @param id id de la langue
   */
  goToLanguage(id): void {
    this.router.navigate([`language/${id}`])
  }

  /**
   * Met à jour la langue
   */
  update() {
    this.languageService.updateLanguage(this.languageForm.value)
      .subscribe(() => { });
  }

  /**
   * Supprime la langue
   */
  delete() {
    this.languageService.deleteLanguage(this.languageForm.value)
      .subscribe(() => { this.goToList() });
  }

  /**
   * Ajoute une nouvelle langue
   */
  add() {
    this.languageService.addLanguage(this.languageForm.value)
      .subscribe(language => {
        this.goToLanguage(language.id);
      });
  }
}
