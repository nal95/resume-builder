import {Component, Input} from '@angular/core';
import {Certification, Language, Training, User, UserDataType} from "../../resume-data/user.data";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {map} from "rxjs";

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
    NgSwitch
  ],
  templateUrl: './easy-list.component.html',
  styleUrl: './easy-list.component.css'
})
export class EasyListComponent {
  @Input()
  valuesType!: UserDataType;

  originTyp: string = '';
  newSimpleValue: string = '';
  newComposedValue: ComposedTyp = {} as ComposedTyp;
  isCertification = this.valuesType == UserDataType.CERTIFICATIONS;

  constructor(public dataStorageService: UserDataStoreService) {
  }


  isSimpleTyp() {
    switch (this.valuesType) {
      case UserDataType.SKILLS:
      case UserDataType.HOBBIES_AND_INTEREST:
      case UserDataType.TOOLS:
      case UserDataType.METHODOLOGIES:
        return true;
      default:
        return false;
    }
  }

  getSimpleValues$() {
    switch (this.valuesType) {
      case UserDataType.SKILLS:
        return this.dataStorageService.userData$
          .pipe(
            map(data => {
              this.originTyp = 'Skill';
              return data.userDetails.skills;
            })
          );
      case UserDataType.HOBBIES_AND_INTEREST:
        return this.dataStorageService.userData$
          .pipe(
            map(data => {
              this.originTyp = 'Hobby or Interest';
              return data.userDetails.hobbiesAndInterest;
            })
          );
      case UserDataType.TOOLS:
        return this.dataStorageService.userData$
          .pipe(
            map(data => {
              this.originTyp = 'Tool';
              return data.userDetails.tools;
            })
          );
      case UserDataType.METHODOLOGIES:
        return this.dataStorageService.userData$
          .pipe(
            map(data => {
              this.originTyp = 'Methodology';
              return data.userDetails.methodologies;
            })
          );
      default:
        throw new Error("Invalid Simple Typ");
    }
  }

  deleteSimpleValue(simpleValues: string[], simpleValue: string) {
    const newSimpleValues = simpleValues.filter(v => v !== simpleValue)
    let userData = this.dataStorageService.userData
    userData = this.updateSimpleValue(userData, newSimpleValues);
    this.dataStorageService.setUserData(userData);
  }

  addSimpleValue(simpleValue: string[]) {
    if (this.newSimpleValue !== '') {
      simpleValue.push(this.newSimpleValue);
      let userData = this.dataStorageService.userData;
      userData = this.updateSimpleValue(userData, simpleValue);
      this.dataStorageService.setUserData(userData);
      this.newSimpleValue = '';
    }
  }

  updateSimpleValue(userData: User, newSimpleValues: string[]): User {
    switch (this.valuesType) {
      case UserDataType.SKILLS:
        userData.userDetails.skills = newSimpleValues;
        break;
      case UserDataType.HOBBIES_AND_INTEREST:
        userData.userDetails.hobbiesAndInterest = newSimpleValues;
        break;
      case UserDataType.TOOLS:
        userData.userDetails.tools = newSimpleValues;
        break;
      case UserDataType.METHODOLOGIES:
        userData.userDetails.methodologies = newSimpleValues;
        break;
      default:
        throw new Error("Invalid Simple Typ");
    }
    return userData;
  }

  getComposedValues$() {
    switch (this.valuesType) {
      case UserDataType.LANGUAGES:
        return this.dataStorageService.userData$
          .pipe(
            map(data => {
              return data.userDetails.languages.map(language => {
                this.originTyp = 'Language';
                const composedTyp: ComposedTyp = {name: language.name, compound: language.level};
                return composedTyp;
              });
            })
          );
      case UserDataType.CERTIFICATIONS:
        return this.dataStorageService.userData$
          .pipe(
            map(data => {
              return data.userDetails.certifications.map(certification => {
                this.originTyp = 'Certification';
                const composedTyp: ComposedTyp = {name: certification.name, compound: certification.validity};
                return composedTyp;
              });
            })
          );
      case UserDataType.TRAININGS:
        return this.dataStorageService.userData$
          .pipe(
            map(data => {
              return data.userDetails.trainings.map(training => {
                this.originTyp = 'Training';
                const composedTyp: ComposedTyp = {name: training.title, compound: training.platform};
                return composedTyp;
              });
            })
          );
      default:
        throw new Error("Invalid Composed Typ");
    }
  }

  deleteComposedValue(composedValue: ComposedTyp) {
    let indexToRemove = -1;
    let userData = this.dataStorageService.userData;

    switch (this.valuesType) {
      case UserDataType.LANGUAGES:
        const language: Language = {name: composedValue.name, level: composedValue.compound};
        indexToRemove = userData.userDetails.languages
          .findIndex(lang => lang.name === language.name && lang.level === language.level);

        if (indexToRemove !== -1) userData.userDetails.languages.splice(indexToRemove, 1);
        break;
      case UserDataType.CERTIFICATIONS:
        const certification: Certification = {name: composedValue.name, validity: composedValue.compound};
        indexToRemove = userData.userDetails.certifications
          .findIndex(cert => cert.name === certification.name && cert.validity === certification.validity);

        if (indexToRemove !== -1) userData.userDetails.certifications.splice(indexToRemove, 1);
        break;
      case UserDataType.TRAININGS:
        const training: Training = {title: composedValue.name, platform: composedValue.compound};
        indexToRemove = userData.userDetails.trainings
          .findIndex(tr => tr.title === training.title && tr.platform === training.platform);

        if (indexToRemove !== -1) userData.userDetails.trainings.splice(indexToRemove, 1);
        break;
    }

    this.dataStorageService.setUserData(userData);
  }

  addComposedValue() {
    if (this.newComposedValue.name && this.newComposedValue.compound !== '') {
      let userData = this.dataStorageService.userData;
      switch (this.valuesType) {
        case UserDataType.LANGUAGES:
          const language: Language = {name: this.newComposedValue.name, level: this.newComposedValue.compound};
          userData.userDetails.languages.push(language);
          break;
        case UserDataType.CERTIFICATIONS:
          const certification: Certification = {
            name: this.newComposedValue.name,
            validity: this.newComposedValue.compound
          };
          userData.userDetails.certifications.push(certification);
          break;
        case UserDataType.TRAININGS:
          const training: Training = {title: this.newComposedValue.name, platform: this.newComposedValue.compound};
          userData.userDetails.trainings.push(training);
          break;
      }

      this.dataStorageService.setUserData(userData);
      this.newComposedValue = {} as ComposedTyp;
    }
  }
}
