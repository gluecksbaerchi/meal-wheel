import {Image} from './image';
import {Ingredient} from './ingredient';

export interface Recipe {
  id: string;
  title: string;
  images: Image[];
  ingredients: Ingredient[];
  description: string;
}
