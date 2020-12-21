import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoPeticionComponent } from './aviso-peticion.component';

describe('AvisoPeticionComponent', () => {
  let component: AvisoPeticionComponent;
  let fixture: ComponentFixture<AvisoPeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoPeticionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
