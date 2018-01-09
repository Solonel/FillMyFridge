import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontRecipesComponent } from './front-recipes.component';

describe('FrontRecipesComponent', () => {
  let component: FrontRecipesComponent;
  let fixture: ComponentFixture<FrontRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
