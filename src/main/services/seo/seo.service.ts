import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  url: string = '';
  siteName: string = 'Apple';
  prefixSiteName: string = ' - Apple (TR)';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.url = window.location.origin; // Base URL
    }
  }

  updateSeoTags(seoData: any) {
    if (!seoData) return;

    const { title, description, image, pageLink } = seoData;

    // Title
    if (title) {
      const fullTitle = title + this.prefixSiteName;
      this.titleService.setTitle(fullTitle);
      this.updateOrCreateMetaTag('property', 'og:title', fullTitle);
      this.updateOrCreateMetaTag('name', 'twitter:title', fullTitle);
    }

    // Description
    if (description) {
      this.updateOrCreateMetaTag('name', 'description', description);
      this.updateOrCreateMetaTag('property', 'og:description', description);
      this.updateOrCreateMetaTag('name', 'twitter:description', description);
    }

    // Image
    if (image) {
      const imageUrl = image.includes('http') ? image : this.url + '/' + image;
      this.updateOrCreateMetaTag('property', 'og:image', imageUrl);
      this.updateOrCreateMetaTag('name', 'twitter:image', imageUrl);
      this.updateOrCreateMetaTag('property', 'og:image:type', 'image/png');
      this.updateOrCreateMetaTag('property', 'og:image:width', '1200');
      this.updateOrCreateMetaTag('property', 'og:image:height', '630');
    }

    // URL
    if (pageLink) {
      const fullUrl = this.url + '/' + pageLink;
      this.updateOrCreateMetaTag('property', 'og:url', fullUrl);
    }

    // Type
    this.updateOrCreateMetaTag('property', 'og:type', 'website');

    // Site Name
    this.updateOrCreateMetaTag('property', 'og:site_name', this.siteName);

    // Twitter Card
    this.updateOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    this.updateOrCreateMetaTag('name', 'twitter:site', '@MotionMeet');
    this.updateOrCreateMetaTag('name', 'twitter:creator', '@MotionMeet');
  }

  private updateOrCreateMetaTag(
    attribute: string,
    name: string,
    content: string
  ) {
    const existingTag = this.metaService.getTag(`${attribute}="${name}"`);
    if (existingTag) {
      this.metaService.updateTag({ [attribute]: name, content });
    } else {
      this.metaService.addTag({ [attribute]: name, content });
    }
  }
}
