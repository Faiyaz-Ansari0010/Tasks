import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNameComponent } from './question-name.component';

describe('QuestionNameComponent', () => {
  let component: QuestionNameComponent;
  let fixture: ComponentFixture<QuestionNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionNameComponent]
    });
    fixture = TestBed.createComponent(QuestionNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
