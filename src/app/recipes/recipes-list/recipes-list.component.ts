import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;

  constructor(private router: Router,
              private route: ActivatedRoute, private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  onRecipeNew() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
