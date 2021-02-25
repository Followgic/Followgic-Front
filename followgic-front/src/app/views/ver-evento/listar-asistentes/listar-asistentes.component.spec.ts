import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAsistentesComponent } from './listar-asistentes.component';

describe('ListarAsistentesComponent', () => {
  let component: ListarAsistentesComponent;
  let fixture: ComponentFixture<ListarAsistentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAsistentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAsistentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
