import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoEliminarEventoComponent } from './aviso-eliminar-evento.component';

describe('AvisoEliminarEventoComponent', () => {
  let component: AvisoEliminarEventoComponent;
  let fixture: ComponentFixture<AvisoEliminarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoEliminarEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoEliminarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
