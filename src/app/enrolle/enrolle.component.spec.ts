import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolleComponent } from './enrolle.component';

describe('EnrolleComponent', () => {
  let component: EnrolleComponent;
  let fixture: ComponentFixture<EnrolleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
