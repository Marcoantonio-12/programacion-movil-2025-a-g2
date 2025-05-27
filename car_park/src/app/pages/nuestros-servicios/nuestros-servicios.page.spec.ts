import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuestrosServiciosPage } from './nuestros-servicios.page';

describe('NuestrosServiciosPage', () => {
  let component: NuestrosServiciosPage;
  let fixture: ComponentFixture<NuestrosServiciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrosServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
