import {Component} from '@angular/core';
import {map} from "rxjs";
import {Education} from "../../resume-data/user-options.data.model";
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


  constructor(private dataStorageService: UserDataStoreService,) {
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

  onDescriptionChanged(description: string, education: Education) {

    this.addEducationDescriptionOrGrade(this.options[0], description, education);
  }

  resetEducationDescriptionAndGrade() {
    this.inputValue = '';
    this.selectedOption = '-';
  }

  selectOption(education: Education) {
    if (this.selectedOption !== '-') {
      this.addEducationDescriptionOrGrade(this.selectedOption, ` `, education)
      this.selectedOption = '-';
    }
  }

  closeGradeEditor(grade: string, education: Education) {
    this.addEducationDescriptionOrGrade(this.selectedOption, grade, education);
    this.selectedOption = this.options[0];
  }
}
