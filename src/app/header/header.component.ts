import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataService: DataStorageService, private authService: AuthService, 
    private router: Router){}
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
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
