import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataService: DataStorageService, private recipeService: RecipeService){}

    // il permet de charger certain trucs avant d'aller ouvrir la page demandée
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        if(this.recipeService.getRecipes().length === 0)
            return this.dataService.fetchRecipes();
        return this.recipeService.getRecipes();
    }

}