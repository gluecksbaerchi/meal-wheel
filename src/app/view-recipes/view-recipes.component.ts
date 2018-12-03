import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {ViewRecipesDataSource} from './view-recipes-datasource';
import {Subscription} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Recipe} from '../models/recipe';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss'],
})
export class ViewRecipesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewRecipesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title'];
  subscription: Subscription;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.dataSource = new ViewRecipesDataSource(this.paginator, this.sort);
    this.subscription = this.db.collection<Recipe>('recipes').snapshotChanges().pipe(map(actions => {
      this.dataSource = new ViewRecipesDataSource(this.paginator, this.sort);
      this.dataSource.data = actions.map(a => {
        const recipe: Recipe = a.payload.doc.data();
        recipe.id = a.payload.doc.id;
        return recipe;
      });
    })).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
