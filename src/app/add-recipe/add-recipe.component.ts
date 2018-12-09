import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import {catchError, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {

  recipe: Recipe = {
    title: '',
    id: null,
    images: [],
    description: '',
    ingredients: [{
      name: '',
      amount: null,
      unit: ''
    }]
  };
  selectedImagePath: string;
  selectedImageUrl: string;

  saving = false;
  uploading = false;
  uploadingError = false;
  uploadProgress: Observable<number>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar
  ) {
    this.storage.storage.setMaxUploadRetryTime(2000);
  }

  onSubmit() {
    this.saving = true;
    if (this.selectedImageUrl) {
      this.recipe.images = [{
        path: this.selectedImagePath,
        url: this.selectedImageUrl
      }];
    }
    this.recipe.id = this.db.createId();
    this.db.collection('recipes').add(this.recipe);
    this.onSaveSuccess();
  }

  uploadFile(files) {
    const file = files.item(0);
    if (file.type.match('image.*')) {
      this.uploading = true;
      const imgPath = `recipe_images/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(imgPath);
      const task = this.storage.upload(imgPath, file);
      this.uploadProgress = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(imageUrl => {
            this.selectedImageUrl = imageUrl;
            this.selectedImagePath = imgPath;
            this.uploading = false;
          });
        }),
        catchError( (err) => {
          this.uploading = false;
          this.uploadingError = true;
          return err;
        })
      ).subscribe();
    } else {
      alert('invalid format!');
    }
  }

  onSaveSuccess() {
    this.snackbar.open('Das Rezept wurde gespeichert.', '', {
      duration: 3000
    });
    this.saving = false;
    this.recipe = {
      title: '',
      id: null,
      description: '',
      images: [],
      ingredients: [{
        name: '',
        amount: null,
        unit: ''
      }]
    };
    this.selectedImageUrl = '';
    this.selectedImagePath = '';
  }

  addIngredient() {
    this.recipe.ingredients.push({
      name: '',
      unit: '',
      amount: null
    });
  }

  removeIngredient(ingredientKey) {
    delete this.recipe.ingredients[ingredientKey];
  }
}
