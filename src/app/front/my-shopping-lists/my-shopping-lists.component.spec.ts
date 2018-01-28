import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShoppingListsComponent } from './my-shopping-lists.component';

describe('MyShoppingListsComponent', () => {
  let component: MyShoppingListsComponent;
  let fixture: ComponentFixture<MyShoppingListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShoppingListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShoppingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
