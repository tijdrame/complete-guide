import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';
import { Recipe } from "../recipes/recipe.model";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    urlFirebase = 'https://ng-recipe-book-b7ff1.firebaseio.com/recipes.json';

    constructor(private http: HttpClient, private recipeService: RecipeService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.urlFirebase, recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>(this.urlFirebase)
        //.pipe(map((recipes: Recipe[]) => {
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
            // avec tap on passe la donnée sans le subscribe
        }),tap(recipes =>this.recipeService.setrecipes(recipes)),)
        /*.subscribe(
            recipes => {
                console.log(recipes);
                this.recipeService.setrecipes(recipes);
            }
        )*/;
    }
}