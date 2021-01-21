import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubGroupComponent } from './view-sub-group.component';

describe('ViewSubGroupComponent', () => {
  let component: ViewSubGroupComponent;
  let fixture: ComponentFixture<ViewSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
