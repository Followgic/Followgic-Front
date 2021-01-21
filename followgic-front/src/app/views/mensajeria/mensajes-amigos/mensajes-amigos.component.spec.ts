import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesAmigosComponent } from './mensajes-amigos.component';

describe('MensajesAmigosComponent', () => {
  let component: MensajesAmigosComponent;
  let fixture: ComponentFixture<MensajesAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesAmigosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
