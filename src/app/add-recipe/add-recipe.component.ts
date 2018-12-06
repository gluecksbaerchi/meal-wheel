import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe = {} as Recipe;
  selectedImagePath: string;
  selectedImageUrl: string;

  saving = false;
  uploading = false;
  uploadProgress: Observable<number>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.saving = true;
    this.db.collection('recipes').add(this.recipe)
      .then(document => {
        this.db.doc('recipes/' + document.id).collection('images').add({
          path: this.selectedImagePath,
          url: this.selectedImageUrl
        }).then( result => {
          this.onSaveSuccess();
        }).catch(error => this.onSaveError(error));
      }).catch(error => {
        this.onSaveError(error);
    });
  }

  uploadFile(files) {
    const file = files.item(0);
    if (file.type.match('image.*')) {
      this.uploading = true;
      const imgPath = `test/${new Date().getTime()}_${file.name}`;
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
        })).subscribe();
    } else {
      alert('invalid format!');
    }
  }

  onSaveError(error) {
    console.log(error);
    this.snackbar.open('Das Rezept konnte nicht gespeichert werden.');
    this.saving = false;
    this.recipe = {} as Recipe;
  }

  onSaveSuccess() {
    this.snackbar.open('Das Rezept wurde gespeichert.');
    this.saving = false;
    this.recipe = {} as Recipe;
    this.selectedImageUrl = '';
    this.selectedImagePath = '';
  }
}
