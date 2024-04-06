import {Component} from '@angular/core';
import {UserDataType} from "../../resume-data/user.data";
import {EasyListComponent} from "../../utils/easy-list/easy-list.component";

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [
    EasyListComponent
  ],
  template: `
    <app-easy-list [valuesType]="valuesType"></app-easy-list>
  `
})
export class HobbiesComponent {
  valuesType: UserDataType = UserDataType.HOBBIES_AND_INTEREST;
}
