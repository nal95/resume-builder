import {Component} from '@angular/core';
import {EasyListComponent} from "../../utils/easy-list/easy-list.component";
import {UserDataType} from "../../resume-data/user.data";

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [
    EasyListComponent
  ],
  template: `
    <app-easy-list [valuesType]="valuesType"></app-easy-list>
  `
})
export class LanguagesComponent {
  valuesType: UserDataType = UserDataType.LANGUAGES;
}
