import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupComponent } from './view-group.component';

describe('ViewGroupComponent', () => {
  let component: ViewGroupComponent;
  let fixture: ComponentFixture<ViewGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
