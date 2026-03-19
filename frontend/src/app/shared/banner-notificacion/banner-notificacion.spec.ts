import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNotificacion } from './banner-notificacion';

describe('BannerNotificacion', () => {
  let component: BannerNotificacion;
  let fixture: ComponentFixture<BannerNotificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerNotificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerNotificacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
