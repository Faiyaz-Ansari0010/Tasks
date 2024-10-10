import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHeadersComponent } from './set-headers.component';

describe('SetHeadersComponent', () => {
  let component: SetHeadersComponent;
  let fixture: ComponentFixture<SetHeadersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetHeadersComponent]
    });
    fixture = TestBed.createComponent(SetHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
