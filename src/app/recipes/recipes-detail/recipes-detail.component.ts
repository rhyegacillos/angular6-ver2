import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import {Observable} from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import {take} from 'rxjs/operators';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(
        take(1)
      ).subscribe(
      (recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      }
    );
    this.router.navigate(['/shopping-list']);
  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
