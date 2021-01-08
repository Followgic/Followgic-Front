import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarModalidadesComponent } from './editar-modalidades.component';

describe('EditarModalidadesComponent', () => {
  let component: EditarModalidadesComponent;
  let fixture: ComponentFixture<EditarModalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarModalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarModalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
