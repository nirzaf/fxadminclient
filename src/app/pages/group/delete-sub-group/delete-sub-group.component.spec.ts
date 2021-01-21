import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubGroupComponent } from './delete-sub-group.component';

describe('DeleteSubGroupComponent', () => {
  let component: DeleteSubGroupComponent;
  let fixture: ComponentFixture<DeleteSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSubGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
