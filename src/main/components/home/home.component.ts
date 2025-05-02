import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, 
    private el: ElementRef,
    private _seoService: SeoService
  ) {}

  ngOnInit() {
    this._seoService.updateSeoTags({
      title: 'Apple',
      description: 'Apple’ın yeniliklerle dolu dünyasını keşfedin ve iPhone, iPad, Apple Watch, Mac ve Apple TV satın alın. Ayrıca aksesuarlara ve eğlence dünyasına göz atın, uzman desteği hakkında bilgi alın.',
      image: '',
      pageLink: ''
    })
  }



  ngAfterViewInit(): void {
    const target = this.el.nativeElement.querySelector('#scrollContainer');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(target, 'show');
          observer.unobserve(entry.target); 
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
