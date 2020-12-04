import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectoBienvenidaComponent } from './efecto-bienvenida.component';

describe('EfectoBienvenidaComponent', () => {
  let component: EfectoBienvenidaComponent;
  let fixture: ComponentFixture<EfectoBienvenidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfectoBienvenidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfectoBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
