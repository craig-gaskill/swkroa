import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AppConfiguration} from './app-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService implements OnDestroy {
  private _subject: BehaviorSubject<AppConfiguration>;

  constructor() {
    const config = new AppConfiguration();
    this._subject = new BehaviorSubject(config);
  }

  public ngOnDestroy(): void {
    this._subject.complete();
  }

  /**
   * Retrieves the current configuration for the application.
   */
  public getAppConfiguration(): Observable<AppConfiguration> {
    return this._subject.asObservable();
  }
}
