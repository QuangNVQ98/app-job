import { Component, Renderer2, OnInit } from '@angular/core';
import {AccountService} from '../@core/service/account.service';
import {ApiAuthService} from '../@core/api/api-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {

  constructor(
    private _router: Router,
    private renderer: Renderer2,
    private _apiAuthService: ApiAuthService
  ) {
    this.renderer.addClass(document.body, 'bg-gradient-primary');
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');

    if (token) {
      this._apiAuthService.checkToken({token}).subscribe(data => {
        if (data && data.status) {
          this._router.navigate(['/']);
        }
      })
    }
  }

}
