import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'Sample Recipe',
      'assets/images/recipe.png',
      [new Ingredient('tomatoes', 5), new Ingredient('garlic', 6)]),
    new Recipe('A Test Recipe 1',
      'Sample Recipe 1',

      'assets/images/recipe.png',
      [new Ingredient('tomatoes', 5), new Ingredient('garlic', 6)]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }


}
