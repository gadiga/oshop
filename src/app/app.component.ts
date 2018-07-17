import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private auth: AuthService, private router: Router, private userService: UserService) {
    this.auth.$loginUser.subscribe(user => {
      if (user) {
        this.userService.save(user);
        
        this.router.navigateByUrl(localStorage.getItem('returnUrl'));
      }
    });
  }
}
