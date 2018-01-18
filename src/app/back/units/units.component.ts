import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Unit } from '../../classes/Unit';
import { Router } from "@angular/router";
import { UnitService } from '../../services/unit.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'lsc-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units: Unit[];
  displayedColumns = ['select', 'id', 'title', 'description'];
  dataSource: MatTableDataSource<Unit>;
  selection: SelectionModel<Unit>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private unitService: UnitService, private languageService: LanguageService) {
    this.dataSource = new MatTableDataSource(this.units);
    this.selection = new SelectionModel<Unit>(true, []);
  }

  ngOnInit() {
    this.getUnits();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUnits() {
    this.unitService.getUnits()
      .subscribe(units => {
        this.units = units;
        this.dataSource.data = units;
      }
      );
  }

  addUnit() {
    this.router.navigate([`unit/add`]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  redirectOnDetail(id) {
    this.router.navigate([`unit/${id}`]);
  }

}
