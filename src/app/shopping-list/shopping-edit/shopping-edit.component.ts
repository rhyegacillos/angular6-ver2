import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('amount') amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
  }

  onAddIngredient() {
    const ingredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);
    this.shoppingListService.addIngredient(ingredient);
  }

}
