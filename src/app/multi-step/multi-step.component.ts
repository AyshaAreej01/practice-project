import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrolleComponent } from '../enrolle/enrolle.component';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { LocationAndPlanComponent } from '../location-and-plan/location-and-plan.component';
import { LocationService } from '../services/location.service';
@Component({
  selector: 'app-multi-step',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatNativeDateModule,
    EnrolleComponent,
    CommonModule,
    PaymentComponent,
    LocationAndPlanComponent,
  ],
  templateUrl: './multi-step.component.html',
  styleUrl: './multi-step.component.css',
})
export class MultiStepComponent {
  locationPlanForm: FormGroup;
  coverageForm: FormGroup;
  enrolleeForm: FormGroup;

  locations = [
    { value: 'aliantUniversity', label: 'Aliant University' },
    { value: 'otherUniversity', label: 'Other University' },
  ];

  plans = [
    { value: 'trailBlazerBasic', label: 'Trail Blazer Basic' },
    { value: 'advancedPlan', label: 'Advanced Plan' },
  ];

  constructor(private fb: FormBuilder, private locationService: LocationService) {
    this.locationPlanForm = this.fb.group({
      location: ['', Validators.required],
      plan: ['', Validators.required],
      destinationCountry: ['', Validators.required],
    });

    this.coverageForm = this.fb.group({
      coverageStartDate: ['', Validators.required],
      coverageLength: [3, [Validators.required, Validators.min(1)]],
      addSpouseCoverage: [false],
      addChildCoverage: [false],
    });

    this.enrolleeForm = this.fb.group({
      firstName: ['', Validators.required],
      middleInitial: [''],
      lastName: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      studentId: [''],
      noUsAddress: [false],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
    });
  }

  onSubmit(): void {
    const formData = {
      ...this.locationPlanForm.value,
      ...this.coverageForm.value,
      ...this.enrolleeForm.value,
    };

    console.log('Submitting Form Data:', formData);

    this.locationService.create(formData).subscribe(
      (response) => {
        console.log('Successfully created:', response);
        alert('Location successfully created!');
      },
      (error) => {
        console.error('Error creating location:', error);
        alert('Failed to create location. Please try again.');
      }
    );
  }
}
