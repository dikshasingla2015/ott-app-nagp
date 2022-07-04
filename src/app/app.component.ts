import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ott-app-nagp';

  language = '';

  isLoader: boolean = false;

  constructor(
    public readonly translate: TranslateService,
    public router: Router) {
    translate.addLangs(['en', 'gr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang!.match(/en|gr/) ? browserLang! : 'en');
    
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.isLoader = true;
      }
      if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        this.isLoader = false;
      }
    });
  }

  ngOnInit() {
  }

}
