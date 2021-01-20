import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoldingcompanyComponent } from './add-holdingcompany.component';

describe('HoldingcompanyComponent', () => {
  let component: AddHoldingcompanyComponent;
  let fixture: ComponentFixture<AddHoldingcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHoldingcompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHoldingcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
