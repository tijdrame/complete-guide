import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MySharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        //CommonModule,
        
        FormsModule,
        RouterModule.forChild([{ path: '', component: ShoppingListComponent },]),
        MySharedModule,
    ]
})
export class ShoppingListModule {

}