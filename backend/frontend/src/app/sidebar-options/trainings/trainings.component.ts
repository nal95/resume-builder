import {Component} from '@angular/core';
import {ResumeDataOptions} from "../../resume-data/resume-options-type";
import {ComposedObjectListComponent} from "../../utils/composed-object-list/composed-object-list.component";

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [
    ComposedObjectListComponent
  ],
  template: `
    <app-composed-object-list [valuesType]="valuesType"></app-composed-object-list>
  `
})
export class TrainingsComponent {
  valuesType: ResumeDataOptions = ResumeDataOptions.TRAININGS;
}
