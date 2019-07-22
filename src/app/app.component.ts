import {Component} from '@angular/core';
import {CgtConfigurationService, CgtFieldAppearance} from '@cagst/ngx-configuration';

@Component({
  selector: 'swkroa-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn = true;

  constructor(private _configService: CgtConfigurationService) {
    this._configService.changeFieldAppearance(CgtFieldAppearance.STANDARD);
  }

}
