import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDashboardComponent } from './base-dashboard.component';

describe('BaseDashboardComponent', () => {
  let component: BaseDashboardComponent;
  let fixture: ComponentFixture<BaseDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BaseDashboardComponent]
    });
    fixture = TestBed.createComponent(BaseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
