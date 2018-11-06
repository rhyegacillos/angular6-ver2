import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://recipe-db-8ca5b.firebaseio.com/recipe.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
   const token = this.authService.getToken();
    this.http.get('https://recipe-db-8ca5b.firebaseio.com/recipe.json?auth=' + token)
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
