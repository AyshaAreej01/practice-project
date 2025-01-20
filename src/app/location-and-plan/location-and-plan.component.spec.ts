import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAndPlanComponent } from './location-and-plan.component';

describe('LocationAndPlanComponent', () => {
  let component: LocationAndPlanComponent;
  let fixture: ComponentFixture<LocationAndPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationAndPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAndPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
