import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoCancelarPeticionComponent } from './aviso-cancelar-peticion.component';

describe('AvisoCancelarPeticionComponent', () => {
  let component: AvisoCancelarPeticionComponent;
  let fixture: ComponentFixture<AvisoCancelarPeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoCancelarPeticionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoCancelarPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
