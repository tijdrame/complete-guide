import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
//import { RecipesModule } from './recipes/recipes.module';
import { MySharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //DropdownDirective,
    //AuthComponent,
    //LoadingSpinnerComponent,
    //AlertComponent
    //PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    //RecipesModule,
    //ShoppingListModule,
    MySharedModule,
    CoreModule,
    //AuthModule
  ],
  //providers: [ShoppingListService, RecipeService,
  //{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
