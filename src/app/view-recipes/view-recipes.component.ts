import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {ViewRecipesDataSource, ViewRecipesItem} from './view-recipes-datasource';
import {Subscription} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

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
    this.subscription = this.db.collection<ViewRecipesItem>('recipes').valueChanges().subscribe(d => {
      this.dataSource = new ViewRecipesDataSource(this.paginator, this.sort);
      this.dataSource.data = d;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
