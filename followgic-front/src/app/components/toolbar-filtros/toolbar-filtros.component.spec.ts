import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarFiltrosComponent } from './toolbar-filtros.component';

describe('ToolbarFiltrosComponent', () => {
  let component: ToolbarFiltrosComponent;
  let fixture: ComponentFixture<ToolbarFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarFiltrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
