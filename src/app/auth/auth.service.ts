import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //apiKey = 'AIzaSyCCd21_bYMBqXgCulAP9m--u00fRJ9q4Ss';
    apiKey = environment.firebaseAPIKey;
    urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    urlLogin = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    //user = new Subject<User>();
    //user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router,
        private store: Store<fromApp.AppState>) { }

    /*signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.urlSignUp,
            { email: email, password: password, returnSecureToken: true }
        ).pipe(
            // ne plus utilisé une fction anonyme mais une fonction dedié
            /*catchError(errorResp => {
            console.log(errorResp);
            let errorMessage = 'An unknown error occured!';
            if (!errorResp.error || !errorResp.error.error) return throwError(errorMessage);
            switch (errorResp.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exist!';
            }
            return throwError(errorMessage);
        })*/
           /* catchError(this.handdleError), tap(respData =>
                this.handdleAuthentication(email, respData.localId, respData.idToken, +respData.expiresIn)
                //gerer par la fonction handdleAuthentication
                /*{
                const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
                const user = new User(respData.email, respData.localId, respData.idToken, expirationDate);
                this.user.next(user);
            }*/
            /*));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.urlLogin,
            { email: email, password: password, returnSecureToken: true })
            .pipe(catchError(this.handdleError), tap(respData =>
                this.handdleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
                //gerer par la fonction handdleAuthentication
                /*{
                const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
                const user = new User(respData.email, respData.localId, respData.idToken, expirationDate);
                this.user.next(user);
            }*/
            /*));
    }

    /*logout() {
        //this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        // localStorage.clear(); efface tout, pas forcément ce que l'on veut    
        //this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

    }*/

    setLogoutTimer(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(
                new AuthActions.Logout()
            );
        }, expirationDuration);
    }

    clearLogoutTimer(){
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    /*private handdleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        //this.user.next(user);
        this.store.dispatch(new AuthActions.AuthenticateSuccess({
            email: email, userId: userId,
            token: token, expirationDate: expirationDate
        }));
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }*/

    /*autoLogin() {
        const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string; } = JSON.parse(localStorage.getItem('userData'));
        if (!userData)
            return;


        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            //this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.AuthenticateSuccess({
                email: loadedUser.email, userId: loadedUser.id,
                token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)
            }))
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }*/

    /*private handdleError(errorResp: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if (!errorResp.error || !errorResp.error.error) return throwError(errorMessage);
        switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exist!';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'This operation is not allowed!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email is not found!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect password!';
                break;
        }
        return throwError(errorMessage);

    }*/
}