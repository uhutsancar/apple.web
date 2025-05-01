import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mac',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.css']
})
export class MacComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
  }



  ngAfterViewInit(): void {
    const target = this.el.nativeElement.querySelector('#macbookContainer');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(target, 'show');
          observer.unobserve(entry.target); // sadece 1 kere tetiklensin
        }
      });
    }, {
      threshold: 0.2
    });

    if (target) {
      observer.observe(target);
    }
  }

}
