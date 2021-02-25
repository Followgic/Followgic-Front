import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoEliminarAsistenteComponent } from './aviso-eliminar-asistente.component';

describe('AvisoEliminarAsistenteComponent', () => {
  let component: AvisoEliminarAsistenteComponent;
  let fixture: ComponentFixture<AvisoEliminarAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoEliminarAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoEliminarAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
