import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../classes/unit';

@Component({
  selector: 'lsc-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  @Input() unit: Unit;
  fetchingData = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService) { }

  ngOnInit() {
    this.getUnit();
  }

  getUnit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.unitService.getUnitNo404(id)
      .subscribe(unit => { this.unit = unit; this.fetchingData = false; });
  }

  goToList(): void {
    this.router.navigate([`units`]);
  }

  save(): void {
    this.unitService.updateUnit(this.unit)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    this.unitService.deleteUnit(this.unit)
      .subscribe(() => this.goToList());
  }

  addUnit(formData) {
    this.unitService.addUnit(formData).subscribe(() => this.goToList());;
  }

}
