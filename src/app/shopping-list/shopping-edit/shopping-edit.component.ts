import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShlistActions from "../store/shopping-list.action";
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }


  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        this.slForm.setValue({
          'name': this.editItem.name,
          'amount': this.editItem.amount
        })
      }else {
        this.editMode = false;
      }
    });
    /*this.subscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editItemidex = index;
        this.editMode = true;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          'name': this.editItem.name,
          'amount': this.editItem.amount
        })
      }
    );*/
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.slService.updateIngredient(this.editItemidex, newIngredient);
      this.store.dispatch(new ShlistActions.UpdateIngredient(newIngredient));
    }
    else {
      this.store.dispatch(new ShlistActions.AddIngredient(newIngredient));
      //this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShlistActions.StopEdit());
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editItemidex);
    this.store.dispatch(new ShlistActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShlistActions.StopEdit());
  }

}
