import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../main/layout/header/header.component';
import { FooterComponent } from "../main/layout/footer/footer.component";
import { filter } from 'rxjs';
import { CookieConsentComponent } from "../main/layout/cookie-consent/cookie-consent";


@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
   <app-cookie-consent></app-cookie-consent> 
  <app-footer></app-footer>
`,
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieConsentComponent]
})
export class AppComponent {
  title = 'apple.web';

  // authService = inject(AuthService);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
