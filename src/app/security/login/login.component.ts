import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '../service/authentication.service';
import {AuthenticationStatus} from '../authentication-status.enum';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'swkroa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _returnUrl: string;

  public readonly AUTH_STATUS = AuthenticationStatus;

  public loginForm: FormGroup;
  public error: string;
  public processing = false;

  constructor(private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router,
              private _authenticationService: AuthenticationService
  ) {
    this.loginForm = this._formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]]
    });
  }

  public ngOnInit() {
    // get return url from route parameters or default to '/'
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onLogin() {
    this.processing = true;
    this.error      = undefined;

    const loginForm = this.loginForm.value;

    this._authenticationService.login(loginForm)
      .pipe(
        finalize(() => {
          this.processing = false;
        })
      )
      .subscribe((result) => {
        if (result.status === AuthenticationStatus.STATUS_VALID) {
          this._router.navigate([this._returnUrl]);
        }
      }, (error: HttpErrorResponse) => {
        if (error && error.error && error.error.status) {
          this.error = error.error.status;
        } else {
          this.error = AuthenticationStatus.STATUS_INVALID;
        }
      });
  }
}
