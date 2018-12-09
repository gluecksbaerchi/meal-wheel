import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientFormFieldsComponent } from './ingredient-form-fields.component';

describe('IngredientFormFieldsComponent', () => {
  let component: IngredientFormFieldsComponent;
  let fixture: ComponentFixture<IngredientFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientFormFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
