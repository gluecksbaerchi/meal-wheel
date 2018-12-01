import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipe: any = {};

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

  }

  onSubmit() {
    this.db.collection('recipes').add(this.recipe)
      .then(_ => {
        this.recipe = {};
        console.log('success');
      });
  }

}
