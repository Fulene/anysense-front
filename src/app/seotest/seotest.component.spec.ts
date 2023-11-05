import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeotestComponent } from './seotest.component';

describe('SeotestComponent', () => {
  let component: SeotestComponent;
  let fixture: ComponentFixture<SeotestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SeotestComponent]
    });
    fixture = TestBed.createComponent(SeotestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
