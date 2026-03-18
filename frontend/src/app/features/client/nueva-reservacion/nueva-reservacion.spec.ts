import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReservacion } from './nueva-reservacion';

describe('NuevaReservacion', () => {
  let component: NuevaReservacion;
  let fixture: ComponentFixture<NuevaReservacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaReservacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaReservacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
