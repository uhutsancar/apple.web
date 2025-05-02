import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-mac',
  standalone: true,
  imports: [],
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.css'],
})
export class MacComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private _seoService: SeoService
  ) {}

  ngOnInit() {
    this._seoService.updateSeoTags({
      title: 'Mac ',
      description:
        'Şimdiye kadarki en güçlü Mac laptoplar ve masaüstü bilgisayarlar. Süper güçlü Apple çip. MacBook Air, MacBook Pro, iMac, Mac mini ve Mac Studio.',
      image: '',
      pageLink: '',
    });
  }

  ngAfterViewInit(): void {
    const target = this.el.nativeElement.querySelector('#macbookContainer');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(target, 'show');
            observer.unobserve(entry.target); // sadece 1 kere tetiklensin
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (target) {
      observer.observe(target);
    }
  }
}
