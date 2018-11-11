import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from '../store/recipes.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as fromRecipe from './recipe.reducers';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RecipesEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {
  }

  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(
      switchMap(
        (action: RecipeActions.FetchRecipes) => {
          return this.http.get<Recipe[]>('https://recipe-db-8ca5b.firebaseio.com/recipe.json', {
            observe: 'body',
            responseType: 'json'
          });
        },
      ),
      map(
        (recipes) => {
          recipes.forEach(
            (recipe: Recipe) => {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
          );
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      )
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
      withLatestFrom(
        this.store.select('recipes')
      ),
      switchMap(
        ([action, state]) => {
          const req = new HttpRequest('PUT',
            'https://recipe-db-8ca5b.firebaseio.com/recipe.json',
            state.recipes, {reportProgress: true});
          return this.http.request(req);
        }
      )
    );


}
