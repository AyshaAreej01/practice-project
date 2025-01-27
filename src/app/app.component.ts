import { Component } from '@angular/core';
import { LocationAndPlanComponent } from './location-and-plan/location-and-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MultiStepComponent } from './multi-step/multi-step.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { CrudComponent } from './crud/crud.component';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    CrudComponent,
    MultiStepComponent,
    PaymentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-angular-app';
  student:any={
    name:'John Doe',
    age: 25,
  }
}
