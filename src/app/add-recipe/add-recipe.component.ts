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
  selectedFiles: FileList;
  selectedImage: string;

  saving = false;
  uploadProgress: Observable<number>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.selectedFiles) {
      this.saving = true;
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      this.selectedImage = '';

      const imgPath = `test/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(imgPath);
      const task = this.storage.upload(imgPath, file);
      this.uploadProgress = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(imageUrl => {
            this.db.collection('recipes').add(this.recipe)
              .then(document => {
                this.db.doc('recipes/' + document.id).collection('images').add({
                  path: imgPath,
                  url: imageUrl
                });
                this.snackbar.open('Das Rezept wurde gespeichert.');
                this.saving = false;
                this.recipe = {} as Recipe;
              }).catch(error => {
                console.log(error);
                this.snackbar.open('Das Rezept konnte nicht gespeichert werden.');
                this.saving = false;
                this.recipe = {} as Recipe;
            });
          });
        })).subscribe();
    }
  }

  selectFile(files) {
    const file = files.item(0);
    if (file.type.match('image.*')) {
      this.selectedFiles = files;
      this.selectedImage = file.name;
    } else {
      alert('invalid format!');
    }
  }
}
