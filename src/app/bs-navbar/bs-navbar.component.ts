import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-users.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  appUser: AppUser;

  ngOnInit() {
    this.authService.appUser$.subscribe(appUser=>this.appUser=appUser);
  }

  logout() {

    this.authService.logout();

  }

}
