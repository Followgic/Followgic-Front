import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEtiquetasComponent } from './buscador-etiquetas.component';

describe('BuscadorEtiquetasComponent', () => {
  let component: BuscadorEtiquetasComponent;
  let fixture: ComponentFixture<BuscadorEtiquetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorEtiquetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
