import {Component} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {Education} from "../../resume-data/user.data";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {InputWithIconTextComponent} from "../../utils/input-with-icon-text/input-with-icon-text.component";
import {QuillComponent} from "../../utils/quill/quill.component";

@Component({
  selector: 'app-educations',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    InputWithIconTextComponent,
    QuillComponent,
  ],
  templateUrl: './educations.component.html',
  styleUrl: './educations.component.css'
})
export class EducationsComponent {

  userEducations$ = this.dataStorageService.userData$.pipe(
    map(user => user.userDetails.educations)
  );

  options = ['Description', 'Grade'];
  selectedOption: string = '-';
  inputValue: string = '';
  isSmall: boolean = false;
  showDescriptionAndGradeSection$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(public dataStorageService: UserDataStoreService) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isSmall = window.innerWidth <= 1200;
  }

  addEducation() {
    let userData = this.dataStorageService.userData;
    const newEducation: Education = {
      school: '',
      field: '',
      degree: '',
      startDate: '',
      endDate: '',
      duration: 0,
      grade: '',
      description: '',
      showContent: true
    };

    userData.userDetails.educations.push(newEducation);
    this.dataStorageService.setUserData(userData);
  }

  toggleEducation(education: Education) {
    education.showContent = !education.showContent;
    this.resetEducationDescriptionAndGrade();
  }

  deleteEducation(education: Education) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.educations.indexOf(education);

    if (index !== -1) {
      userData.userDetails.educations.splice(index, 1);
      this.dataStorageService.setUserData(userData);
    }
  }

  addEducationDescriptionOrGrade(option: string, val: string, education: Education) {
    let userData = this.dataStorageService.userData;
    const index = userData.userDetails.educations.indexOf(education);

    if (this.options.includes(option)) {
      if (index !== -1) {
        switch (option) {
          case this.options[0]:
            userData.userDetails.educations[index].description = val;
            break;
          case this.options[1]:
            userData.userDetails.educations[index].grade = val;
            break;
          default:
            throw new Error("Invalid Option");
        }
      }

      this.dataStorageService.setUserData(userData);
    }
  }

  showDescriptionAndGradeSection() {
    this.showDescriptionAndGradeSection$.next(true);
  }

  onDescriptionChanged(description: string) {
    this.inputValue = description;
  }

  resetEducationDescriptionAndGrade() {
    this.showDescriptionAndGradeSection$.next(false);
    this.inputValue = '';
    this.selectedOption = '-';
  }
}
