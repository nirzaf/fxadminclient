import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubGroupComponent } from './add-sub-group.component';

describe('AddSubGroupComponent', () => {
  let component: AddSubGroupComponent;
  let fixture: ComponentFixture<AddSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
