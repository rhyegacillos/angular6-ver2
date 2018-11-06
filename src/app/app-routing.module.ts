import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipesDetailComponent} from './recipes/recipes-detail/recipes-detail.component';
import {RecipesListComponent} from './recipes/recipes-list/recipes-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuardService} from './auth/auth-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: RecipesDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService]}
    ]},
  {path: 'shopping-list', component: ShoppingListComponent, children: [
      {path: 'edit', component: ShoppingEditComponent }
    ], canActivate: [AuthGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
