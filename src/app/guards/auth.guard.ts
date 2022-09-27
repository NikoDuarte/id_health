import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaticsService } from '../api/statics.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private static_services: StaticsService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (localStorage.getItem('usuario')) {
      const user = JSON.parse(localStorage.getItem('usuario') || '')
      this.static_services.user = new User(user.rol, user.estado, user.google, user.nombre, user.correo, user.uid)
      return true;
    }else {
      this.router.navigateByUrl('/sign-in')
      return false
    }
  }
  
}
