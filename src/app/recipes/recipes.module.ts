import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipesDetailComponent} from './recipes-detail/recipes-detail.component';
import {RecipeItemComponent} from './recipes-list/recipe-item/recipe-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipeReducers} from './store/recipe.reducers';
import {EffectsModule} from '@ngrx/effects';
import {RecipesEffects} from './store/recipes.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipesListComponent,
    RecipeEditComponent,
    RecipesDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducers),
    EffectsModule.forFeature([RecipesEffects])
  ]
})


export class RecipesModule {

}
