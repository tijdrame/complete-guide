import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    authObs: Observable<AuthResponseData>;

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        if (this.isLoginMode) {
            this.authObs = this.authService.login(form.value.email, form.value.password)
            /*.subscribe(respData => {
                console.log(respData);
                this.isLoading = false;
            }, errorResp => {
                console.log(errorResp);
                this.error = errorResp;
                this.isLoading = false;
            })*/;
        } else {
            this.authObs = this.authService.signUp(form.value.email, form.value.password);
        }

        this.authObs.subscribe(respData => {
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
            this.error = errorResp;
            this.isLoading = false;
        });

        form.reset();
    }
}