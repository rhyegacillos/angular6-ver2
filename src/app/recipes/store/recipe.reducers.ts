import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../recipe.model';
import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('A Test Recipe',
      'Sample Recipe',
      'assets/images/recipe.png',
      [new Ingredient('tomatoes', 5), new Ingredient('garlic', 6)]),
    new Recipe('A Test Recipe 1',
      'Sample Recipe 1',

      'assets/images/recipe.png',
      [new Ingredient('tomatoes', 5), new Ingredient('garlic', 6)]),
  ]

};

export function recipeReducers(state = initialState, action: RecipeActions.RecipesActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const getRecipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...getRecipe,
        ...action.payload.recipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
  }

  return state;
}
