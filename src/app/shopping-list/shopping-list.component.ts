import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging-service';

import { Ingredient } from '../shared/ingredient.model';
import * as ShlistActions from "./store/shopping-list.action";
import * as fromApp from "../store/app.reducer";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //ingredients: Ingredient[];
  ingredients: Observable<{ingredients: Ingredient[]}> ;
  private subscription: Subscription;

  constructor(private loggingService: LoggingService,
    //private store: Store<fromShoppingList.AppState>
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');


    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');

     /*this.ingredients = this.slService.getIngredients();
     this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );*/
  }

  onEditItem(i: number){
    //this.slService.startEditing.next(i);
    this.store.dispatch(new ShlistActions.StartEdit(i));
  }
  
  ngOnDestroy(): void {
      //this.subscription.unsubscribe();
  }

  
}
