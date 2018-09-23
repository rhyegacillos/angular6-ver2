import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Sample Recipe', 'assets/images/recipe.png'),
    new Recipe('A Test Recipe 1', 'Sample Recipe 1', 'assets/images/recipe.png')
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  ngOnInit() {
  }

  onSelectedRecipe(recipeClicked: Recipe) {
    this.recipeWasSelected.emit(recipeClicked);
  }

}
