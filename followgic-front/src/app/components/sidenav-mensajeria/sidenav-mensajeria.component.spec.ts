import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMensajeriaComponent } from './sidenav-mensajeria.component';

describe('SidenavMensajeriaComponent', () => {
  let component: SidenavMensajeriaComponent;
  let fixture: ComponentFixture<SidenavMensajeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavMensajeriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMensajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
