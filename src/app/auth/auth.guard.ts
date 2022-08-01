import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user
        .pipe(take(1),//reupere le user une fois et unsubscribe
        map(user => {
            //return !!user; case 1 marche aussi
            const isAuth = !!user;
            if(isAuth) return true;
            return this.router.createUrlTree(['/auth']);
        }), 
        /*case 1 marche aussi
        tap(isAuth => {
            if(!isAuth){
                this.router.navigate(['/auth']);
            }
        })*/
        );
    }

}