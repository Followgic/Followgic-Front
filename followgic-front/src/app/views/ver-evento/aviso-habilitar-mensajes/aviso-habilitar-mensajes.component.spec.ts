import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoHabilitarMensajesComponent } from './aviso-habilitar-mensajes.component';

describe('AvisoHabilitarMensajesComponent', () => {
  let component: AvisoHabilitarMensajesComponent;
  let fixture: ComponentFixture<AvisoHabilitarMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoHabilitarMensajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoHabilitarMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
