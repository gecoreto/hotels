import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router) { }

    canActivate() {
        if (!this.isLogged()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    public isLogged(): boolean {
        //Verifico si existen datos de usuario logueado....
        return true;
    }
}
