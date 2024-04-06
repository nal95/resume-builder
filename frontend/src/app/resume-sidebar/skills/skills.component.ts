import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {EasyListComponent} from "../../utils/easy-list/easy-list.component";
import {UserDataType} from "../../resume-data/user.data";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    EasyListComponent
  ],
  template: `
    <app-easy-list [valuesType]="valuesType"></app-easy-list>
  `
})
export class SkillsComponent {
  valuesType: UserDataType = UserDataType.SKILLS;
}
