import { Ingredient } from "../../shared/ingredient.model";
//import { ADD_INGREDIENT } from "./shopping-list.action";
import * as ShlistActions from "./shopping-list.action";

export interface AppState {
    shoppingList: State;
    // on peut avoir plusieurs state par la suite
}
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ],
    editedIngredient: null, 
    editedIngredientIndex: -1, 
};

export function shoppingListReducer(state: State = initialState, action: ShlistActions.ShoppingListActions){
    switch(action.type) {
        case ShlistActions.ADD_INGREDIENT:
            return{
//tjrs copier pour ne pas perdre les autres props meme si ici on une seule prop
                ...state, 
                ingredients: [ ...state.ingredients, action.payload]
            };
        case ShlistActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [ ...state.ingredients,  ...action.payload ]
            };
        case ShlistActions.UPDATE_INGREDIENT:
            const ing = state.ingredients[state.editedIngredientIndex];
            const updatedIng = {
                ...ing,//copie et garder par ex id
                ...action.payload//changer ce qui doit etre
            };
            const updatedIngs = [...state.ingredients];
            updatedIngs[state.editedIngredientIndex] = updatedIng;
            return {
                ...state,
                ingredients: updatedIngs,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShlistActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, index) => {
                    return index != state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShlistActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShlistActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        default:
            return state;
    }

}