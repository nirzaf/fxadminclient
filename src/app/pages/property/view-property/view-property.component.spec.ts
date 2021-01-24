import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertyComponent } from './view-property.component';

describe('ViewPropertyComponent', () => {
  let component: ViewPropertyComponent;
  let fixture: ComponentFixture<ViewPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
