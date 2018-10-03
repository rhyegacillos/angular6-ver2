import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

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

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }


}
