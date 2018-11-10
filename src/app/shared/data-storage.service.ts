import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes() {
    // return this.http.put('https://recipe-db-8ca5b.firebaseio.com/recipe.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token),
    //   headers: new HttpHeaders()
    // });
    const req = new HttpRequest('PUT',
      'https://recipe-db-8ca5b.firebaseio.com/recipe.json',
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.http.request(req);
  }

  getRecipes() {
    this.http.get<Recipe[]>('https://recipe-db-8ca5b.firebaseio.com/recipe.json', {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (recipes) => {
          recipes.forEach(
            (recipe: Recipe) => {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
          );
          console.log('recipes: ', recipes)
          return recipes;
        }
      )).subscribe(
        (recipes: Recipe[]) => this.recipeService.recipeChanged.next(recipes)
      );
  }
}
