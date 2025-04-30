import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
  }



  ngAfterViewInit(): void {
    const target = this.el.nativeElement.querySelector('#scrollContainer');

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
