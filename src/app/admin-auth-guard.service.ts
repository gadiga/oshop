import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AppUser } from './models/app-users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  obsToData: Observable<AppUser>;
  obsRef: AngularFireObject<AppUser>;

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate () {

    return this.auth.appUser$.pipe(map(appUser=>appUser.isAdmin));

  }
}
