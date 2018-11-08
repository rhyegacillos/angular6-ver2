import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {ShoppingListComponent} from './shopping-list.component';
import {CommonModule} from '@angular/common';

const shoppingListRoutes: Routes = [
  {path: 'shopping-list', component: ShoppingListComponent, children: [
      {path: 'edit', component: ShoppingEditComponent }
    ], canActivate: [AuthGuardService]}
];

@NgModule ({
  imports: [
    CommonModule,
    RouterModule.forChild(shoppingListRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ShoppingListRoutingModule {

}
