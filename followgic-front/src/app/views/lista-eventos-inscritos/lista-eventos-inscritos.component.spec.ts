import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEventosInscritosComponent } from './lista-eventos-inscritos.component';

describe('ListaEventosInscritosComponent', () => {
  let component: ListaEventosInscritosComponent;
  let fixture: ComponentFixture<ListaEventosInscritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEventosInscritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEventosInscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
