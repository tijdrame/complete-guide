import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    urlFirebase = 'https://ng-recipe-book-b7ff1.firebaseio.com/recipes.json';

    constructor(private http: HttpClient, private recipeService: RecipeService,
        private authService: AuthService){}

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
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
            // avec tap on passe la donnée sans le subscribe
        }),tap(recipes =>this.recipeService.setrecipes(recipes)),)
        //.pipe(map((recipes: Recipe[]) => {
        /*.subscribe(
            recipes => {
                console.log(recipes);
                this.recipeService.setrecipes(recipes);
            }
        )*/;
    }
}