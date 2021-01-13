import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensoComponent } from './suspenso.component';

describe('SuspensoComponent', () => {
  let component: SuspensoComponent;
  let fixture: ComponentFixture<SuspensoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspensoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
