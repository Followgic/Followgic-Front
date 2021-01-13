import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoPreguntasComponent } from './aviso-preguntas.component';

describe('AvisoPreguntasComponent', () => {
  let component: AvisoPreguntasComponent;
  let fixture: ComponentFixture<AvisoPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
