import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {map, Observable} from "rxjs";
import {InputWithIconTextComponent} from "../input-with-icon-text/input-with-icon-text.component";
import {ResumeDataOptions} from "../../resume-data/resume-options-type";
import {User} from "../../resume-data/user-options.data.model";

interface ComposedTyp {
  name: string,
  compound: string,
}

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

  newSimpleValue: string = '';
  // newComposedValue: ComposedTyp = {} as ComposedTyp;
  // isCertification = this.valuesType == ResumeDataOptions.CERTIFICATIONS;

  constructor(public dataStorageService: UserDataStoreService) {
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
          .pipe(map(data => data.userDetails.interests));
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

  addValue(value: string[]) {
    if (this.newSimpleValue !== '') {
      value.push(this.newSimpleValue);
      let userData = this.dataStorageService.userData;
      userData = this.updateSimpleValue(userData, value);
      this.dataStorageService.setUserData(userData);
      this.newSimpleValue = '';
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

  // getComposedValues$() {
  //   switch (this.valuesType) {
  //     case ResumeDataOptions.LANGUAGES:
  //       return this.dataStorageService.userData$
  //         .pipe(
  //           map(data => {
  //             return data.userDetails.languages.map(language => {
  //               const composedTyp: ComposedTyp = {name: language.name, compound: language.level};
  //               return composedTyp;
  //             });
  //           })
  //         );
  //     case ResumeDataOptions.CERTIFICATIONS:
  //       return this.dataStorageService.userData$
  //         .pipe(
  //           map(data => {
  //             return data.userDetails.certifications.map(certification => {
  //               const composedTyp: ComposedTyp = {name: certification.name, compound: certification.validity};
  //               return composedTyp;
  //             });
  //           })
  //         );
  //     case ResumeDataOptions.TRAININGS:
  //       return this.dataStorageService.userData$
  //         .pipe(
  //           map(data => {
  //             return data.userDetails.trainings.map(training => {
  //               const composedTyp: ComposedTyp = {name: training.title, compound: training.platform};
  //               return composedTyp;
  //             });
  //           })
  //         );
  //     default:
  //       throw new Error("Invalid Composed Typ");
  //   }
  // }

  // deleteComposedValue(composedValue: ComposedTyp) {
  //   let indexToRemove = -1;
  //   let userData = this.dataStorageService.userData;
  //
  //   switch (this.valuesType) {
  //     case ResumeDataOptions.LANGUAGES:
  //       const language: Language = {name: composedValue.name, level: composedValue.compound};
  //       indexToRemove = userData.userDetails.languages
  //         .findIndex(lang => lang.name === language.name && lang.level === language.level);
  //
  //       if (indexToRemove !== -1) userData.userDetails.languages.splice(indexToRemove, 1);
  //       break;
  //     case ResumeDataOptions.CERTIFICATIONS:
  //       const certification: Certification = {name: composedValue.name, validity: composedValue.compound};
  //       indexToRemove = userData.userDetails.certifications
  //         .findIndex(cert => cert.name === certification.name && cert.validity === certification.validity);
  //
  //       if (indexToRemove !== -1) userData.userDetails.certifications.splice(indexToRemove, 1);
  //       break;
  //     case ResumeDataOptions.TRAININGS:
  //       const training: Training = {title: composedValue.name, platform: composedValue.compound};
  //       indexToRemove = userData.userDetails.trainings
  //         .findIndex(tr => tr.title === training.title && tr.platform === training.platform);
  //
  //       if (indexToRemove !== -1) userData.userDetails.trainings.splice(indexToRemove, 1);
  //       break;
  //   }
  //
  //   this.dataStorageService.setUserData(userData);
  // }

  // addComposedValue() {
  //   if (this.newComposedValue.name && this.newComposedValue.compound !== '') {
  //     let userData = this.dataStorageService.userData;
  //     switch (this.valuesType) {
  //       case ResumeDataOptions.LANGUAGES:
  //         const language: Language = {name: this.newComposedValue.name, level: this.newComposedValue.compound};
  //         userData.userDetails.languages.push(language);
  //         break;
  //       case ResumeDataOptions.CERTIFICATIONS:
  //         const certification: Certification = {
  //           name: this.newComposedValue.name,
  //           validity: this.newComposedValue.compound
  //         };
  //         userData.userDetails.certifications.push(certification);
  //         break;
  //       case ResumeDataOptions.TRAININGS:
  //         const training: Training = {title: this.newComposedValue.name, platform: this.newComposedValue.compound};
  //         userData.userDetails.trainings.push(training);
  //         break;
  //     }
  //
  //     this.dataStorageService.setUserData(userData);
  //     this.newComposedValue = {} as ComposedTyp;
  //   }
  // }
}
