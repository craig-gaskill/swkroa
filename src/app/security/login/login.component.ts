import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../service/authentication.service';
import {AuthenticationStatus} from '../authentication-status.enum';
import {AppConfigurationService} from '../../app-configuration.service';
import {AppConfiguration} from '../../app-configuration.model';

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

  public configuration$: Observable<AppConfiguration>;

  constructor(private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router,
              private _authenticationService: AuthenticationService,
              private _appConfigService: AppConfigurationService
  ) {
    this.loginForm = this._formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]]
    });
  }

  public ngOnInit() {
    // get return url from route parameters or default to '/'
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    this.configuration$ = this._appConfigService.getAppConfiguration();
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
