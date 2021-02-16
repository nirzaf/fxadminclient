import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbConnectionComponent } from './db-connection.component';

describe('DbConnectionComponent', () => {
  let component: DbConnectionComponent;
  let fixture: ComponentFixture<DbConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
