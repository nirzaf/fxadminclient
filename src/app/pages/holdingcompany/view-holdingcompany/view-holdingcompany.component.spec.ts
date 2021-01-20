import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHoldingcompanyComponent } from './view-holdingcompany.component';

describe('ViewHoldingcompanyComponent', () => {
  let component: ViewHoldingcompanyComponent;
  let fixture: ComponentFixture<ViewHoldingcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHoldingcompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHoldingcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
