import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListGeneratorComponent } from './shopping-list-generator.component';

describe('ShoppingListGeneratorComponent', () => {
  let component: ShoppingListGeneratorComponent;
  let fixture: ComponentFixture<ShoppingListGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
