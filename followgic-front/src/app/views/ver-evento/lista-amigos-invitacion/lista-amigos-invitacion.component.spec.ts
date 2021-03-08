import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAmigosInvitacionComponent } from './lista-amigos-invitacion.component';

describe('ListaAmigosInvitacionComponent', () => {
  let component: ListaAmigosInvitacionComponent;
  let fixture: ComponentFixture<ListaAmigosInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAmigosInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAmigosInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
