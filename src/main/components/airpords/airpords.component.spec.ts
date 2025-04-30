/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AirpordsComponent } from './airpords.component';

describe('AirpordsComponent', () => {
  let component: AirpordsComponent;
  let fixture: ComponentFixture<AirpordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirpordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirpordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
