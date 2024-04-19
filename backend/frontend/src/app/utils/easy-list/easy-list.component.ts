import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {map, Observable} from "rxjs";
import {InputWithIconTextComponent} from "../input-with-icon-text/input-with-icon-text.component";
import {ResumeDataOptions} from "../../resume-data/resume-options-type";
import {User} from "../../resume-data/user-options.data.model";

@Component({
  selector: 'app-easy-list',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    NgSwitchCase,
    NgSwitch,
    InputWithIconTextComponent
  ],
  templateUrl: './easy-list.component.html',
})
export class EasyListComponent implements OnInit, OnDestroy{
  @Input() valuesType!: ResumeDataOptions;

  data$: Observable<string[]> = new Observable<string[]>();
  isEasyList: boolean = false;

  newValue: string = '';

  constructor(private dataStorageService: UserDataStoreService) {
  }

  ngOnInit(): void {
    this.isEasyResumeDataOption();
    if (this.isEasyList)
      this.getValues();
  }

  ngOnDestroy(): void {
    this.isEasyList = false;
  }

  isEasyResumeDataOption() {
    switch (this.valuesType) {
      case ResumeDataOptions.SKILLS:
      case ResumeDataOptions.INTERESTS:
      case ResumeDataOptions.TOOLS:
      case ResumeDataOptions.METHODOLOGIES:
        this.isEasyList = true;
        break;
      default:
        this.isEasyList = false;
    }
  }

  getValues() {
    switch (this.valuesType) {
      case ResumeDataOptions.SKILLS:
        this.data$ = this.dataStorageService.userData$
          .pipe(map(data => data.userDetails.skills));
        break;
      case ResumeDataOptions.INTERESTS:
        this.data$ = this.dataStorageService.userData$
          .pipe(map(data => data.userDetails.interests));
        break;
      case ResumeDataOptions.TOOLS:
        this.data$ = this.dataStorageService.userData$
          .pipe(map(data => data.userDetails.tools));
        break;
      case ResumeDataOptions.METHODOLOGIES:
        this.data$ = this.dataStorageService.userData$
          .pipe(map(data => data.userDetails.methodologies));
        break;
      default:
        throw new Error("Invalid Resume Data Options");
    }
  }

  deleteValue(values: string[], value: string) {
    const newSimpleValues = values.filter(v => v !== value)
    let userData = this.dataStorageService.userData
    userData = this.updateSimpleValue(userData, newSimpleValues);
    this.dataStorageService.setUserData(userData);
  }

  addValue(values: string[]) {
    if (this.newValue !== '') {
      values.push(this.newValue);
      let userData = this.dataStorageService.userData;
      userData = this.updateSimpleValue(userData, values);
      this.dataStorageService.setUserData(userData);
      this.newValue = '';
    }
  }

  updateSimpleValue(userData: User, newValues: string[]): User {
    switch (this.valuesType) {
      case ResumeDataOptions.SKILLS:
        userData.userDetails.skills = newValues;
        break;
      case ResumeDataOptions.INTERESTS:
        userData.userDetails.interests = newValues;
        break;
      case ResumeDataOptions.TOOLS:
        userData.userDetails.tools = newValues;
        break;
      case ResumeDataOptions.METHODOLOGIES:
        userData.userDetails.methodologies = newValues;
        break;
      default:
        throw new Error("Invalid Resume Data Options");
    }

    return userData;
  }
}
