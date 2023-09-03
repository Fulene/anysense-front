import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSelectionComponent } from './profile-selection.component';

describe('ProfileSelectionComponent', () => {
  let component: ProfileSelectionComponent;
  let fixture: ComponentFixture<ProfileSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileSelectionComponent]
    });
    fixture = TestBed.createComponent(ProfileSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
