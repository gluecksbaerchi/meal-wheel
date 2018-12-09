import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from '../models/ingredient';

@Component({
  selector: 'app-ingredient-form-fields',
  templateUrl: './ingredient-form-fields.component.html',
  styleUrls: ['./ingredient-form-fields.component.scss']
})
export class IngredientFormFieldsComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Input() ingredientKey: number;
  @Output() removeIngredient = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
