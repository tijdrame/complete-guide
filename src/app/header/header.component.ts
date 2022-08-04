import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataService: DataStorageService, private authService: AuthService, 
    private router: Router, private store: Store<fromApp.AppState>){}
  
  ngOnInit(): void {
    this.userSub = 
    //this.authService.user
    this.store.select('auth').pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user; // this.isAuthenticated = user != null ? true: false
      console.log(!user);
      console.log(!!user);
    })
  }

  onSaveData(){
    this.dataService.storeRecipes();
  }

  onfetchData(){
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
