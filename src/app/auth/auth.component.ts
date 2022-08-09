import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "./alert/alert.component";
import { AuthResponseData, AuthService } from "./auth.service";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    //authObs: Observable<AuthResponseData>;
    //@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;  
    private closeSub : Subscription;
    private storeSub : Subscription;

    constructor(private authService: AuthService, private router: Router,
        private viewContainerRef: ViewContainerRef, private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if(this.error){
                this.ShowErrorAlert(this.error);
            }
        })
    }
    

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        //this.isLoading = true;
        if (this.isLoginMode) {
            //this.authObs = this.authService.login(form.value.email, form.value.password)
            this.store.dispatch(new AuthActions.LoginStart(
                {email:form.value.email, password:form.value.password}))
            /*.subscribe(respData => {
                console.log(respData);
                this.isLoading = false;
            }, errorResp => {
                console.log(errorResp);
                this.error = errorResp;
                this.isLoading = false;
            })*/;
        } else {
            //this.authObs = this.authService.signUp(form.value.email, form.value.password);
            this.store.dispatch(new AuthActions.SignupStart({email: form.value.email, password:form.value.password}))
        }
        
        /*this.authObs.subscribe(respData => {
            console.log(respData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorResp => {
            console.log(errorResp);
            // ça marche mais ne pas mettre trop de code sur la partie composant.
            // on a deplace et mis ça sur le service avec l'op pipe
            /*switch (errorResp.error.error.message) {
                case 'EMAIL_EXISTS':
                    this.error = 'This email already exist!';
            }
            this.error = 'An error occured!';*/
            /*this.error = errorResp;
            this.ShowErrorAlert(errorResp);
            this.isLoading = false;
        });*/

        form.reset();
    }

    onHandleError(){
        //this.error = null;
        this.store.dispatch(new AuthActions.ClearError());
    }

    private ShowErrorAlert(message: string){
        this.viewContainerRef.clear();
        const alertComp = this.viewContainerRef.createComponent(AlertComponent);
        alertComp.instance.message = message;
        this.closeSub = alertComp.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            this.viewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
        if(this.storeSub) this.storeSub.unsubscribe();
    }
}