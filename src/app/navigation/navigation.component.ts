import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthorizedUser} from '../security/authorized-user.model';
import {AuthenticationService} from '../security/service/authentication.service';

@Component({
  selector: 'swkroa-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private _breakpointObserver: BreakpointObserver,
              private _authenticationService: AuthenticationService
  ) {}

  public isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public currentUser$: Observable<AuthorizedUser> = this._authenticationService.currentUser
    .pipe(
      map(result => {
        if (!result) {
          return undefined;
        } else if (!result.isAuthenticated) {
          return undefined;
        } else {
          return result;
        }
      })
    );

}
