import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxMatrixComponent } from './checkbox-matrix.component';

describe('CheckboxMatrixComponent', () => {
  let component: CheckboxMatrixComponent;
  let fixture: ComponentFixture<CheckboxMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxMatrixComponent]
    });
    fixture = TestBed.createComponent(CheckboxMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
