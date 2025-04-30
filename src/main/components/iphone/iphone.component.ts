import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.css']
})
export class IphoneComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {}

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
