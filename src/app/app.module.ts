import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatGridListModule
} from '@angular/material';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import {RouterModule} from '@angular/router';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import {FormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { IngredientFormFieldsComponent } from './ingredient-form-fields/ingredient-form-fields.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddRecipeComponent,
    ViewRecipesComponent,
    RecipeDetailComponent,
    IngredientFormFieldsComponent,
    MealPlannerComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot([
        {
            path: '', component: NavComponent, children: [
                { path: 'add-recipe', component: AddRecipeComponent },
                { path: 'view-recipes', component: ViewRecipesComponent },
                { path: '', redirectTo: '/view-recipes', pathMatch: 'full' },
                { path: 'recipe/:id', component: RecipeDetailComponent },
                { path: 'meal-planner', component: MealPlannerComponent },
            ]
        },
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
