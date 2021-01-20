import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHoldingcompanyComponent } from './edit-holdingcompany.component';

describe('EditHoldingcompanyComponent', () => {
  let component: EditHoldingcompanyComponent;
  let fixture: ComponentFixture<EditHoldingcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHoldingcompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHoldingcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
