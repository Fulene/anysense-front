import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBisComponent } from './button-bis.component';

describe('ButtonBisComponent', () => {
  let component: ButtonBisComponent;
  let fixture: ComponentFixture<ButtonBisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonBisComponent]
    });
    fixture = TestBed.createComponent(ButtonBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
