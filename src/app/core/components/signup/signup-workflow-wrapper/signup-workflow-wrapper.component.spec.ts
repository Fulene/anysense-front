import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupWorkflowWrapperComponent } from './signup-workflow-wrapper.component';

describe('SignupWorkflowComponent', () => {
  let component: SignupWorkflowWrapperComponent;
  let fixture: ComponentFixture<SignupWorkflowWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignupWorkflowWrapperComponent]
    });
    fixture = TestBed.createComponent(SignupWorkflowWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
