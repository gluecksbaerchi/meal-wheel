import { Component, OnInit } from '@angular/core';
import {Recipe} from '../models/recipe';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent implements OnInit {

  recipes: Observable<Recipe[]>;
  numberOfDays: number;
  showPlan = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {}

  generateMealPlan() {
    this.recipes = this.db.collection<Recipe>('recipes').snapshotChanges().pipe(map(actions => {
      const recipes = actions.map(a => {
        return a.payload.doc.data();
      });
      let currentIndex = recipes.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = recipes[currentIndex];
        recipes[currentIndex] = recipes[randomIndex];
        recipes[randomIndex] = temporaryValue;
      }
      this.showPlan = true;
      return recipes.slice(0, this.numberOfDays);
    }));
  }
}
