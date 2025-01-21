import { Routes } from '@angular/router';
import { MultiStepComponent } from './multi-step/multi-step.component';
import { LocationAndPlanComponent } from './location-and-plan/location-and-plan.component';

export const routes: Routes = [
    {
        path: '',
        component: MultiStepComponent
    },
    {
        path:'location-and-plan',
        component:LocationAndPlanComponent
    }
];
