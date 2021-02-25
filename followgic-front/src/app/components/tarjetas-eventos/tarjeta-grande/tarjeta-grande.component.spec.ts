import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaGrandeComponent } from './tarjeta-grande.component';

describe('TarjetaGrandeComponent', () => {
  let component: TarjetaGrandeComponent;
  let fixture: ComponentFixture<TarjetaGrandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaGrandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaGrandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
