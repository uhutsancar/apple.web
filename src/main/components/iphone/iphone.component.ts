import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.css']
})
export class IphoneComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2, 
    private el: ElementRef,
    private _seoService: SeoService
     
  ) {}

  ngOnInit(): void {
    this._seoService.updateSeoTags({
      title: 'İphone',
      description: 'Yeni iPhone 16 Pro, iPhone 16 Pro Max, iPhone 16 ve iPhone 16 Plus’ı keşfedin. Apple Intelligence için tasarlandılar.',
      image: '',
      pageLink: ''
    })

  }

  ngAfterViewInit(): void {
    const target = this.el.nativeElement.querySelector('#gridContainer');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(target, 'show');
          observer.unobserve(entry.target); // sadece 1 kere tetiklensin
        }
      });
    }, {
      threshold: 0.1
    });

    if (target) {
      observer.observe(target);
    }
  }
}
