import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixControlsComponent } from './matrix-controls.component';

describe('MatrixControlsComponent', () => {
  let component: MatrixControlsComponent;
  let fixture: ComponentFixture<MatrixControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixControlsComponent]
    });
    fixture = TestBed.createComponent(MatrixControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
