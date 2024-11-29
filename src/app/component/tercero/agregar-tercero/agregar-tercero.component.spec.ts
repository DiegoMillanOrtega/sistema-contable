import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTerceroComponent } from './agregar-tercero.component';

describe('AgregarTerceroComponent', () => {
  let component: AgregarTerceroComponent;
  let fixture: ComponentFixture<AgregarTerceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTerceroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarTerceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
