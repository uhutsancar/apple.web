import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-airpods-max',
  templateUrl: './airpods-max.component.html',
  styleUrls: ['./airpods-max.component.css']  
})
export class AirpodsMaxComponent implements AfterViewInit {
  @ViewChildren('carouselBullet') carouselBullets!: QueryList<ElementRef>;
  @ViewChildren('carouselItem') carouselItemList!: QueryList<ElementRef>;
  @ViewChildren('previewImage') previewImages!: QueryList<ElementRef>;
  @ViewChildren('carouselWrapper') carouselWrapper!: QueryList<ElementRef>;

  activeIndex: number = 0;
  translateVal: number = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // QueryList tamamen yüklendiğinde init ve click kurulumunu yap
    this.carouselBullets.changes.subscribe(() => {
      this.init();
      this.setupBulletClicks();
    });

    // Eğer bileşen hemen yüklenmişse changes tetiklenmeden de başlat
    if (this.carouselBullets.length > 0) {
      this.init();
      this.setupBulletClicks();
    }
  }

  private init(): void {
    const bullets = this.carouselBullets.toArray();
    const items = this.carouselItemList.toArray();
    const previews = this.previewImages.toArray();

    // Başlangıçta aktif olan öğeleri ayarla
    bullets[this.activeIndex]?.nativeElement.classList.add('carousel-indicator--active');
    items[this.activeIndex]?.nativeElement.classList.add('carousel-item--active');
    previews[this.activeIndex]?.nativeElement.classList.add('preview-image--active');
  }

  private setupBulletClicks(): void {
    // Her bir carousel bullet'ine click event listener'ı ekle
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

    // Eğer mevcut active index'lerde eleman yoksa, işlemi sonlandır
    if (!bullets[this.activeIndex] || !items[this.activeIndex] || !previews[this.activeIndex]) return;

    // Eski aktif olan elementlerin class'larını kaldır
    bullets[this.activeIndex].nativeElement.classList.remove('carousel-indicator--active');
    items[this.activeIndex].nativeElement.classList.remove('carousel-item--active');
    previews[this.activeIndex].nativeElement.classList.remove('preview-image--active');

    // Yeni seçilen index'e ait class'ları ekle
    bullets[index].nativeElement.classList.add('carousel-indicator--active');
    items[index].nativeElement.classList.add('carousel-item--active');
    previews[index].nativeElement.classList.add('preview-image--active');

    // Carousel'i hareket ettir
    if (wrapper) {
      wrapper.style.transform = `translateX(${this.translateVal}%)`;
    }

    // Aktif index'i güncelle
    this.activeIndex = index;
  }
}
