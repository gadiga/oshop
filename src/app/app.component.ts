import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private auth: AuthService, private router: Router) {
    this.auth.$loginUser.subscribe(user => {
      if (user) {
        this.router.navigateByUrl(localStorage.getItem('returnUrl'));
      }
    });
  }
}
