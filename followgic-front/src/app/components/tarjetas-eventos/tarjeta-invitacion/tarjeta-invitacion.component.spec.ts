import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaInvitacionComponent } from './tarjeta-invitacion.component';

describe('TarjetaInvitacionComponent', () => {
  let component: TarjetaInvitacionComponent;
  let fixture: ComponentFixture<TarjetaInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
