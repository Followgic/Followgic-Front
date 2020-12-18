import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAmigoComponent } from './no-amigo.component';

describe('NoAmigoComponent', () => {
  let component: NoAmigoComponent;
  let fixture: ComponentFixture<NoAmigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAmigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
