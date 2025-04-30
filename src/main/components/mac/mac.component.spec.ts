/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MacComponent } from './mac.component';

describe('MacComponent', () => {
  let component: MacComponent;
  let fixture: ComponentFixture<MacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
