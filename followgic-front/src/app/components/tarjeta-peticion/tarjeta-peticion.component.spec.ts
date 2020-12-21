import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPeticionComponent } from './tarjeta-peticion.component';

describe('TarjetaPeticionComponent', () => {
  let component: TarjetaPeticionComponent;
  let fixture: ComponentFixture<TarjetaPeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaPeticionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
