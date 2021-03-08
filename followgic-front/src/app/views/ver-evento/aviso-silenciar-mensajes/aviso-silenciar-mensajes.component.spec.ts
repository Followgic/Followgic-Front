import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoSilenciarMensajesComponent } from './aviso-silenciar-mensajes.component';

describe('AvisoSilenciarMensajesComponent', () => {
  let component: AvisoSilenciarMensajesComponent;
  let fixture: ComponentFixture<AvisoSilenciarMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoSilenciarMensajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoSilenciarMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
