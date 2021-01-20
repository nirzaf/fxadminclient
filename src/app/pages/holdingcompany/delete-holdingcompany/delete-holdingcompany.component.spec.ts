import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHoldingcompanyComponent } from './delete-holdingcompany.component';

describe('DeleteHoldingcompanyComponent', () => {
  let component: DeleteHoldingcompanyComponent;
  let fixture: ComponentFixture<DeleteHoldingcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHoldingcompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHoldingcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
