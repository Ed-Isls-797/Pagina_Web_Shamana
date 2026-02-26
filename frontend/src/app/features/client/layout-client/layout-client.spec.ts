import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutClient } from './layout-client';

describe('LayoutClient', () => {
  let component: LayoutClient;
  let fixture: ComponentFixture<LayoutClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
