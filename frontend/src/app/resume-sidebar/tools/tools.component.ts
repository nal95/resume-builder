import {Component} from '@angular/core';
import {UserDataType} from "../../resume-data/user.data";
import {EasyListComponent} from "../../utils/easy-list/easy-list.component";

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [
    EasyListComponent
  ],
  template: `
    <app-easy-list [valuesType]="valuesType"></app-easy-list>
  `
})
export class ToolsComponent {
  valuesType: UserDataType = UserDataType.TOOLS;
}
