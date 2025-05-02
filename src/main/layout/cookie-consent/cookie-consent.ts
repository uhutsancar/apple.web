import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [],
  template: `
    @if ( showSnackbar ) {
    <div id="cookie-bar">
      <p>
        Bu site, kullanıcı deneyiminizi geliştirmek amacıyla çerezler kullanır.
      </p>

      <button (click)="acceptCookies()">Kabul Et</button>
    </div>
    }
  `,
  styles: [
    `
      #cookie-bar {
        font-family: 'Nunito', sans-serif !important;
        background-color: rgba(20, 20, 20, 0.8);
        min-height: 26px;
        color: #ccc;
        line-height: 16px;
        padding: 10px 20px;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        position: fixed;
      }
      #cookie-bar p {
        text-align: center;
        color: #fff;
        font-size: 14px;
        margin: 0;
        display: flex;
        align-items: center;
      }
      #cookie-bar button {
        text-decoration: none;
        line-height: 1.3;
        padding: 2px 10px;
        margin-left: 12px;
        cursor: pointer;
        outline: 0;
        border: none;
        letter-spacing: 0.5px;
        min-width: 90px;
        border-radius: 3px;
        background: #fff;
        color: #3a3a3a;
        font-size: 13px;
      }
    `,
  ],
})
export class CookieConsentComponent {
  showSnackbar: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkCookieConsent();
    }
  }

  checkCookieConsent() {
    if (isPlatformBrowser(this.platformId)) {
      const consent = this.getCookie('cookieConsent');
      if (consent !== 'true') {
        this.showSnackbar = true;
      }
    }
  }

  acceptCookies() {
    if (isPlatformBrowser(this.platformId)) {
      this.setCookie('cookieConsent', 'true', 180); // Çerez  6 ay geçerli
      this.showSnackbar = false;
    }
  }

  setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }
}


