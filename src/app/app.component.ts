import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../main/layout/header/header.component';
import { FooterComponent } from "../main/layout/footer/footer.component";
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
`,
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'apple.web';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
