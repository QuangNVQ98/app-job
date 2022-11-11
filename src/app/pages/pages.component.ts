import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from '../@core/service/account.service';
import {Router} from '@angular/router';
import {ApiAuthService} from '../@core/api/api-auth.service';
import {ROLE_ADMIN} from '../@core/constants/app.constant';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(
    private _router: Router,
    private modalService: NgbModal,
    private _accountService: AccountService,
    private _apiAuthService: ApiAuthService
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');

    if (token) {
      this._apiAuthService.checkToken({token}).subscribe(data => {
        if (data && data.status) {
          this._accountService.account = data.data.profile;
          this._accountService.token = data.data.token;
        } else {
          this._router.navigate(['/auth']);
        }
      }, error => {
        this._router.navigate(['/auth']);
      })
    } else {
      this._router.navigate(['/auth']);
    }
  }

  hasPermission(code) {
    if (this._accountService.account && this._accountService.account.role == ROLE_ADMIN) return true;

    if (this._accountService.account) {
      if (this._accountService.account.acl.includes(code)) {
        return true;
      }
    }

    return false;
  }

  logout(): void {
    sessionStorage.clear();
    this._accountService.token = null;
    this._accountService.account = null;

    this._router.navigate(['auth']);
  }
}
