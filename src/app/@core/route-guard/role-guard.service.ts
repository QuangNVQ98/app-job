import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import jwt_decode from "jwt-decode";
import {ROLE_ADMIN} from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardService implements CanActivate {
  constructor(
    private router: Router
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');

    if (!token) {
      this.router.navigate(['auth']);
      return false;
    }

    const permissionCode = route.data && route.data['permission_code'];
    if (!permissionCode) {
      this.router.navigate(['pages']);
      return false;
    }

    const decode = jwt_decode(token);

    if (!decode) {
      this.router.navigate(['auth']);
      return false;
    }

    // @ts-ignore
    if (decode.profile.role == ROLE_ADMIN) {
      return true;
    }

    // @ts-ignore
    if (decode.profile.acl.includes(permissionCode)) {
      return true;
    }

    this.router.navigate(['pages']);
    return false;
  }
}
