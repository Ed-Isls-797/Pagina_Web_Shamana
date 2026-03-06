import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContenido } from './admin-contenido';

describe('AdminContenido', () => {
  let component: AdminContenido;
  let fixture: ComponentFixture<AdminContenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContenido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContenido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
