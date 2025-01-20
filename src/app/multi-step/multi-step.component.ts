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

  ],
  templateUrl: './multi-step.component.html',
  styleUrl: './multi-step.component.css'
})
export class MultiStepComponent {
   locationPlanForm: FormGroup;
    coverageForm: FormGroup;
    enrolleeForm: FormGroup;
    states = [
      'AL',
      'AK',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'FL',
      'GA',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY',
    ];
  
    constructor(private fb: FormBuilder) {
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
        // state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      });
    }
  
    onSubmit(): void {
      console.log('Form Submitted', {
        ...this.locationPlanForm.value,
        ...this.coverageForm.value,
        ...this.enrolleeForm.value,
      });
    }

}
