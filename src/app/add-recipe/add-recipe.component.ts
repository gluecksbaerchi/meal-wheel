import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipe: any = {};

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {

  }

  onSubmit() {
    this.db.list('recipes').push(this.recipe)
      .then(_ => {
        this.recipe = {};
        console.log('success');
      });
  }

}
