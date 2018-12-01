import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipe: any = {};

  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.recipe);
  }

}
