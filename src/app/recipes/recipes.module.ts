import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MySharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutingModule } from "./recipes.routing";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [RouterModule, 
        //pour avoir les ngIf, ngFor .. car Browsermodule ne peut etre appelé qu'une fois dans le module princ
        //CommonModule, est emmene par SharedModule
        MySharedModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ],
    //pas besoin d'export car on use pas ses composants en dehors de ce module
    /*exports: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ]
    */
})
export class RecipesModule {

}