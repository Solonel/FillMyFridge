import { Component, OnInit, ViewChild } from '@angular/core';
import { Language } from '../../classes/language';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from "@angular/router";
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'lsc-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  languages: Language[];
  displayedColumns = ['select', 'id', 'label', 'flag'];
  dataSource: MatTableDataSource<Language>;
  selection: SelectionModel<Language>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private languageService: LanguageService) {
    this.dataSource = new MatTableDataSource(this.languages);
    this.selection = new SelectionModel<Language>(true, []);
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
    this.getLanguages();
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Récupère les langages
   */
  getLanguages() {
    this.languageService.getLanguages()
      .subscribe(languages => {
        this.languages = languages;
        this.dataSource.data = languages;
      });
  }

  /**
   * Redirige vers l'ajout d'un langage
   */
  addLanguage() {
    this.router.navigate([`language/add`]);
  }

  /**
   * Permet de filtrer la liste
   * @param filterValue Valeur entrée dans le champ filtre
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Vérifie si tout est sélectionné
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** 
   * Selects all rows if they are not all selected; otherwise clear selection. 
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * Redirige vers la page de détail
   * @param id Identifiant de l'enregistrement
   */
  redirectOnDetail(id) {
    this.router.navigate([`language/${id}`]);
  }

}
