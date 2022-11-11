import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiAuthService} from '../../@core/api/api-auth.service';
import {AccountService} from '../../@core/service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _apiAuthService: ApiAuthService,
    private _accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  validateForm(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.validateForm();

    if (this.form.valid) {
      this.isLoading = true;
      this._apiAuthService.login(this.form.value).subscribe(data => {
        this.isLoading = false;
        if (data && data.status) {
          sessionStorage.setItem('token', data.data.token);
          this._accountService.account = data.data.profile;
          this._accountService.token = data.data.token;
          this.router.navigate(['/']);
        }
      }, error => {
        this.isLoading = false;
      });
    }
  }
}
