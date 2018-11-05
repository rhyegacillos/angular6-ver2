import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://recipe-db-8ca5b.firebaseio.com/recipe.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://recipe-db-8ca5b.firebaseio.com/recipe.json')
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          recipes.forEach(
            (recipe: Recipe) => {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
          );
          return recipes;
        }
      )).subscribe(
        (recipes: Recipe[]) => this.recipeService.recipeChanged.next(recipes)
      );
  }
}
