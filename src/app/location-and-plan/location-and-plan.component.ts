import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-location-and-plan',
  imports: [FormsModule],
  templateUrl: './location-and-plan.component.html',
  styleUrl: './location-and-plan.component.css',
})
export class LocationAndPlanComponent {
 courseName:string = 'Angular';
 inputType:string = 'text';
 rollNo:number = 10;
 isPakistani:boolean = true;
 currentDate:Date = new Date();
 firstName=signal("John");
 constructor(){

}
changeCourseName(){
  this.courseName = 'Typescript';
 }
}
