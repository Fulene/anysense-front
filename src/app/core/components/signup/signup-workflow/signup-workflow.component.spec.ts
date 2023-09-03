import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupWorkflowComponent } from './signup-workflow.component';

describe('SignupWorkflowComponent', () => {
  let component: SignupWorkflowComponent;
  let fixture: ComponentFixture<SignupWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignupWorkflowComponent]
    });
    fixture = TestBed.createComponent(SignupWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
