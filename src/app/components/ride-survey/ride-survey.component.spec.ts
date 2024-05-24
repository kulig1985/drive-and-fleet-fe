import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideSurveyComponent } from './ride-survey.component';

describe('RideSurveyComponent', () => {
  let component: RideSurveyComponent;
  let fixture: ComponentFixture<RideSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RideSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
