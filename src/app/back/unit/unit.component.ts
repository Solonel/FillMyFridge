import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UnitService } from '../../services/unit.service';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Unit } from '../../classes/unit';
import { LanguageService } from "../../services/language.service";

@Component({
  selector: 'lsc-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  isLoading: boolean = true;
  isNewLanguageReady: boolean;
  @Input() unit: Unit;

  fetchingData = true;

  unitForm: FormGroup;

  /**
 *  Dictionnaire de langue de l'unité
 */
  locales: { [key: string]: FormGroup };
  /**
  * Les langues de l'unité non implémentés
  */
  unitNotImplementedLanguages = [];

  /**
   * Les langues de l'unité implémentés
   */
  unitImplementedLanguages = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private unitService: UnitService) {
    this.createForm();
    this.locales = {};
  }

  ngOnInit() {
    this.getUnit();
  }

  createForm() {
    this.unitForm = this.fb.group({
      id: null, // Id
      locale: null, // Tableau de langue
    });
  }

  getUnit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.unitService.getUnitNo404(id).
      _finally(() => {
        this.isLoading = false
      }).subscribe(unit => {
        // On associe l'unité retournée au formulaire react
        if (unit) {
          this.unitForm.patchValue({
            id: unit.id,
          });
          // On récupère les langues déjà implémentées
          this.setLocaleGroup(unit.locale);

        } else {
          // Si pas d'unité retournée, on récupère la collection de language non implémentés
          // On passe alors en paramètre un tableau vide signifiant qu'il n'y a pas de langue déjà implémentées
          this.languageService.getNotImplementedLanguages([]).subscribe(notImplementedLanguages => {
            this.unitNotImplementedLanguages = notImplementedLanguages;
          });
        }
      });
  }

  setLocaleGroup(locale): any {
    // Key/Value de la collection de traduction
    // On créé un tableau temporaire pour avoir les id des langues de l ingredient
    let localeIds = [];

    // Pour chaque langue implémentée 
    // i est l'id de la langue
    for (let i in locale) {
      // On créé un objet temporaire pour créé le formgroup
      let obj = {
        title: locale[i].title,
        available: locale[i].available,
        shorted: locale[i].shorted
      }

      // On crée un FormGroup pour la langue
      this.locales[i] = this.fb.group(obj);

      // On stock les ids des langues implémentées
      localeIds.push(i);
    }

    // On récupère toutes les langues
    this.getLanguages(localeIds);

    // On ajoute les FormGroup des langues dans le control "locale" du formulaire de l'unité
    this.unitForm.setControl('locale', this.fb.group(this.locales));
  }

  getLanguages(localeIds): any {
    // Appel au LanguageService pour récupérer les langues implémentées
    this.languageService.getImplementedLanguages(localeIds).subscribe(implementedLanguages => {
      this.unitImplementedLanguages = implementedLanguages;
    });
    // Appel au LanguageService pour récupérer les langues non implémentées
    this.languageService.getNotImplementedLanguages(localeIds).subscribe(notImplementedLanguages => {
      this.unitNotImplementedLanguages = notImplementedLanguages;
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
    this.unitForm.setControl('locale', this.fb.group(this.locales));
    this.isNewLanguageReady = true;
  }

  goToList(): void {
    this.router.navigate([`units`]);
  }

  /**
   * Redirige sur l'unité passée en paramètre
   * @param id Id de l'unité sur laquelle être redirigée
   */
  goToUnit(id): void {
    this.router.navigate([`unit/${id}`]);
  }
  save(): void {
    this.unitService.updateUnit(this.unitForm.value)
      .subscribe(() => {
        this.getUnit()
      });
  }

  delete(): void {
    this.unitService.deleteUnit(this.unitForm.value)
      .subscribe(() => {
        this.goToList()
      });
  }

  addUnit(formData) {
    this.unitService.addUnit(formData).subscribe(unit => {
      this.goToUnit(unit.id)
    });;
  }

}
