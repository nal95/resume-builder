import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LanguageLevel, ResumeDataOptions} from "../../resume-data/resume-options-type";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {map, Observable} from "rxjs";
import {InputWithIconTextComponent} from "../input-with-icon-text/input-with-icon-text.component";
import {AsyncPipe, JsonPipe, KeyValuePipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Certification, Language, Training} from "../../resume-data/user-options.data.model";

interface ComposedValue {
  name: string,
  compound: string,
}

@Component({
  selector: 'app-composed-object-list',
  standalone: true,
  imports: [
    InputWithIconTextComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
    JsonPipe,
    KeyValuePipe,
    SlicePipe,
    NgClass
  ],
  templateUrl: './composed-object-list.component.html',
  styles: `
    /*table {*/
    /*  border-collapse: unset;*/
    /*  border-spacing: unset;*/
    /*}*/

    .text-container {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media screen and (min-width: 600px) {
      .text-container {
        white-space: normal;
        width: 100%; /* Adjust width as needed */
      }

      .text-container.tag {
        display: table;
      }
    }
  `
})
export class ComposedObjectListComponent implements OnInit, OnDestroy {

  @Input() valuesType!: ResumeDataOptions;

  composedValue: ComposedValue = {} as ComposedValue;
  data$: Observable<ComposedValue[]> = new Observable<ComposedValue[]>();
  isComposedObjectList: boolean = false;
  isSmall: boolean = false;
  tableHeaderColOne = '';
  tableHeaderColTwo = '';
  languageLevels = LanguageLevel;

  constructor(public dataStorageService: UserDataStoreService) {
    this.checkIfMobile();
  }

  ngOnInit(): void {
    this.isComposedResumeDataOption();
    if (this.isComposedObjectList) this.getValues();
  }

  ngOnDestroy(): void {
    this.isComposedObjectList = false;
    this.composedValue = {} as ComposedValue;
    this.tableHeaderColOne = '';
    this.tableHeaderColTwo = '';
  }

  isComposedResumeDataOption() {
    switch (this.valuesType) {
      case ResumeDataOptions.LANGUAGES:
      case ResumeDataOptions.CERTIFICATIONS:
      case ResumeDataOptions.TRAININGS:
        this.isComposedObjectList = true;
        break;
      default:
        this.isComposedObjectList = false;
    }
  }

  getValues() {
    switch (this.valuesType) {
      case ResumeDataOptions.LANGUAGES:
        this.data$ = this.dataStorageService.userData$
          .pipe(map(data => {
            this.setTableHeader(data.userDetails.languages);
            return data.userDetails.languages.map(language => {
              const composedValues: ComposedValue = {name: language.name, compound: language.level};
              return composedValues;
            })
          }));
        break
      case ResumeDataOptions.CERTIFICATIONS:
        this.data$ = this.dataStorageService.userData$
          .pipe(map(data => {
            this.setTableHeader(data.userDetails.certifications);
            return data.userDetails.certifications.map(certification => {
              const composedValues: ComposedValue = {name: certification.name, compound: certification.validity};
              return composedValues;
            })
          }));
        break
      case ResumeDataOptions.TRAININGS:
        this.data$ = this.dataStorageService.userData$
          .pipe(map(data => {
            this.setTableHeader(data.userDetails.trainings);
            return data.userDetails.trainings.map(training => {
              const composedValues: ComposedValue = {name: training.title, compound: training.platform};
              return composedValues;
            })
          }));
        break
      default:
        throw new Error("Invalid Composed Resume Data Options");
    }
  }

  deleteComposedValue(composedValue: ComposedValue) {
    let indexToRemove = -1;
    let userData = this.dataStorageService.userData;

    switch (this.valuesType) {
      case ResumeDataOptions.LANGUAGES:
        const language: Language = {name: composedValue.name, level: composedValue.compound};
        indexToRemove = userData.userDetails.languages
          .findIndex(lang => lang.name === language.name && lang.level === language.level);

        if (indexToRemove !== -1) userData.userDetails.languages.splice(indexToRemove, 1);
        break;
      case ResumeDataOptions.CERTIFICATIONS:
        const certification: Certification = {name: composedValue.name, validity: composedValue.compound};
        indexToRemove = userData.userDetails.certifications
          .findIndex(cert => cert.name === certification.name && cert.validity === certification.validity);

        if (indexToRemove !== -1) userData.userDetails.certifications.splice(indexToRemove, 1);
        break;
      case ResumeDataOptions.TRAININGS:
        const training: Training = {title: composedValue.name, platform: composedValue.compound};
        indexToRemove = userData.userDetails.trainings
          .findIndex(tr => tr.title === training.title && tr.platform === training.platform);

        if (indexToRemove !== -1) userData.userDetails.trainings.splice(indexToRemove, 1);
        break;
    }

    this.dataStorageService.setUserData(userData);
  }

  addComposedValue() {
    if (this.composedValue.name && this.composedValue.compound !== '') {
      let userData = this.dataStorageService.userData;
      switch (this.valuesType) {
        case ResumeDataOptions.LANGUAGES:
          const language: Language = {name: this.composedValue.name, level: this.composedValue.compound};
          userData.userDetails.languages.push(language);
          break;
        case ResumeDataOptions.CERTIFICATIONS:
          const certification: Certification = {
            name: this.composedValue.name,
            validity: this.composedValue.compound
          };
          userData.userDetails.certifications.push(certification);
          break;
        case ResumeDataOptions.TRAININGS:
          const training: Training = {title: this.composedValue.name, platform: this.composedValue.compound};
          userData.userDetails.trainings.push(training);
          break;
      }

      this.dataStorageService.setUserData(userData);
      this.composedValue = {} as ComposedValue;
    }
  }

  setTableHeader(value: (Language | Certification | Training)[]) {
    if (value.length > 0) {
      this.tableHeaderColOne = this.capitalizeFirstLetter(Object.keys(value[0])[0]);
      this.tableHeaderColTwo = this.capitalizeFirstLetter(Object.keys(value[0])[1]);
    }
  }

  private checkIfMobile() {
    // Check if viewport width is less than or equal to 768px (adjust as needed)
    this.isSmall = window.innerWidth <= 1200;
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

