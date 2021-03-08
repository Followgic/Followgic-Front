import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoCancelarInscripcionComponent } from './aviso-cancelar-inscripcion.component';

describe('AvisoCancelarInscripcionComponent', () => {
  let component: AvisoCancelarInscripcionComponent;
  let fixture: ComponentFixture<AvisoCancelarInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoCancelarInscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoCancelarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
