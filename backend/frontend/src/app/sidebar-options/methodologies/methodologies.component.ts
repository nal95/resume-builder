import {Component} from '@angular/core';
import {EasyListComponent} from "../../utils/easy-list/easy-list.component";
import {ResumeDataOptions} from "../../resume-data/resume-options-type";

@Component({
  selector: 'app-methodologies',
  standalone: true,
  imports: [
    EasyListComponent
  ],
  template: `
    <app-easy-list [valuesType]="valuesType"></app-easy-list>
  `,
})
export class MethodologiesComponent {
  valuesType: ResumeDataOptions = ResumeDataOptions.METHODOLOGIES;
}
