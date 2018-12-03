import {Component, Input, OnInit} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {ActivatedRoute} from '@angular/router';
import {Image} from '../models/image';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  images: Image[];

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    const recipeId = this.route.snapshot.paramMap.get('id');
    db.collection<Image>('recipes/' + recipeId + '/images').valueChanges().subscribe(images => {
      this.images = images;
    });
  }

  ngOnInit() {
  }

}
