import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnWidthComponent } from './column-width.component';

describe('ColumnWidthComponent', () => {
  let component: ColumnWidthComponent;
  let fixture: ComponentFixture<ColumnWidthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnWidthComponent]
    });
    fixture = TestBed.createComponent(ColumnWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
