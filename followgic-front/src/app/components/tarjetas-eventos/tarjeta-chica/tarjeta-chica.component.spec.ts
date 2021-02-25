import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaChicaComponent } from './tarjeta-chica.component';

describe('TarjetaChicaComponent', () => {
  let component: TarjetaChicaComponent;
  let fixture: ComponentFixture<TarjetaChicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaChicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaChicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
