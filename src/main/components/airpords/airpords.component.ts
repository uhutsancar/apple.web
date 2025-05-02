import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-airpords',
  templateUrl: './airpords.component.html',
  styleUrls: ['./airpords.component.css'],
})
export class AirpordsComponent implements AfterViewInit {
  @ViewChild('scrollCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private frameCount = 148;
  private canvasWidth = 1158;
  private canvasHeight = 770;
  private img = new Image();
  private url =
    'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/';

  //airpods-max

  @ViewChildren('carouselBullet') carouselBullets!: QueryList<ElementRef>;
  @ViewChildren('carouselItem') carouselItemList!: QueryList<ElementRef>;
  @ViewChildren('previewImage') previewImages!: QueryList<ElementRef>;
  @ViewChildren('carouselWrapper') carouselWrapper!: QueryList<ElementRef>;

  activeIndex: number = 0;
  translateVal: number = 0;

  constructor(private renderer: Renderer2, 
    private el: ElementRef,
    private _seoService: SeoService
  ) {}

  ngOnInit(): void {

    this._seoService.updateSeoTags({
      title: 'Airpods',
      description: 'AirPods, hızlı ve kolay kurulumdan yüksek ses kalitesine kadar tüm özellikleriyle olağanüstü bir kablosuz kulaklık deneyimi sunuyor. Üstelik ücretsiz lazer baskı seçeneğiyle.',
      image: '',
      pageLink: ''
    })

  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d')!;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    this.img.src = this.currentFrame(1);
    this.img.onload = () => {
      this.context.drawImage(this.img, 0, 0);
    };

    this.renderer.listen('window', 'scroll', () => {
      const html = document.documentElement;
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        this.frameCount - 1,
        Math.ceil(scrollFraction * this.frameCount)
      );
      requestAnimationFrame(() => this.updateImage(frameIndex + 1));
    });

    // airpods-max

  
    this.carouselBullets.changes.subscribe(() => {
      this.init();
      this.setupBulletClicks();
    });


    if (this.carouselBullets.length > 0) {
      this.init();
      this.setupBulletClicks();
    }

    const target = this.el.nativeElement.querySelector('#airpodsContainer');

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
        threshold: 0.1,
      }
    );

    if (target) {
      observer.observe(target);
    }
  }

  //airpods
  private currentFrame(index: number): string {
    return `${this.url}${index.toString().padStart(4, '0')}.jpg`;
  }

  private updateImage(index: number): void {
    this.img.src = this.currentFrame(index);
    this.img.onload = () => {
      this.context.drawImage(this.img, 0, 0);
    };
  }

  //airpods-max

  private init(): void {
    const bullets = this.carouselBullets.toArray();
    const items = this.carouselItemList.toArray();
    const previews = this.previewImages.toArray();


    bullets[this.activeIndex]?.nativeElement.classList.add(
      'carousel-indicator--active'
    );
    items[this.activeIndex]?.nativeElement.classList.add(
      'carousel-item--active'
    );
    previews[this.activeIndex]?.nativeElement.classList.add(
      'preview-image--active'
    );
  }

  private setupBulletClicks(): void {
    
    this.carouselBullets.forEach((bullet, index) => {
      this.renderer.listen(bullet.nativeElement, 'click', () => {
        this.changeSlide(index);
      });
    });
  }

  private changeSlide(index: number): void {
    this.translateVal = index * -100;

    const bullets = this.carouselBullets.toArray();
    const items = this.carouselItemList.toArray();
    const previews = this.previewImages.toArray();
    const wrapper = this.carouselWrapper.first?.nativeElement;


    if (
      !bullets[this.activeIndex] ||
      !items[this.activeIndex] ||
      !previews[this.activeIndex]
    )
      return;


    bullets[this.activeIndex].nativeElement.classList.remove(
      'carousel-indicator--active'
    );
    items[this.activeIndex].nativeElement.classList.remove(
      'carousel-item--active'
    );
    previews[this.activeIndex].nativeElement.classList.remove(
      'preview-image--active'
    );


    bullets[index].nativeElement.classList.add('carousel-indicator--active');
    items[index].nativeElement.classList.add('carousel-item--active');
    previews[index].nativeElement.classList.add('preview-image--active');

    if (wrapper) {
      wrapper.style.transform = `translateX(${this.translateVal}%)`;
    }


    this.activeIndex = index;
  }
}

// @ViewChild('videoElement') videoRef!: ElementRef<HTMLVideoElement>;

// private readonly FRAMES = 148;
// private readonly FPS = 30;

// constructor(private renderer: Renderer2) {}

// ngAfterViewInit(): void {
//   const video = this.videoRef.nativeElement;

//   // Başlangıçta videoyu duraklat ve sıfırla
//   video.pause();
//   video.currentTime = 0;

//   // Scroll eventini dinle
//   this.renderer.listen('window', 'scroll', () => {
//     const scrollY = window.scrollY;
//     const time = (scrollY / 1000) * this.FRAMES / this.FPS;

//     video.currentTime = time;
//   });
// }
