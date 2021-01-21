import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaMensajeComponent } from './tarjeta-mensaje.component';

describe('TarjetaMensajeComponent', () => {
  let component: TarjetaMensajeComponent;
  let fixture: ComponentFixture<TarjetaMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaMensajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
