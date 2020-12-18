import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMagosComponent } from './listar-magos.component';

describe('ListarMagosComponent', () => {
  let component: ListarMagosComponent;
  let fixture: ComponentFixture<ListarMagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
