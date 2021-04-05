import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMagosLocalizacionComponent } from './mostrar-magos-localizacion.component';

describe('MostrarMagosLocalizacionComponent', () => {
  let component: MostrarMagosLocalizacionComponent;
  let fixture: ComponentFixture<MostrarMagosLocalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarMagosLocalizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarMagosLocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
