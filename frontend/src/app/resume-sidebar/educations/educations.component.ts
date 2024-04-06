import {Component} from '@angular/core';
import {map} from "rxjs";
import {Education} from "../../resume-data/user.data";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";

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
  ],
  templateUrl: './educations.component.html',
  styleUrl: './educations.component.css'
})
export class EducationsComponent {
  userEducations$ = this.dataStorageService.userData$.pipe(
    map(user => user.userDetails.educations)
  );

  constructor(public dataStorageService: UserDataStoreService) {
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
      summary: '',
      showContent: true
    };

    userData.userDetails.educations.push(newEducation);
    this.dataStorageService.setUserData(userData);
  }

  toggleEducation(education: Education) {
    education.showContent = !education.showContent;
  }

  deleteEducation(education: Education) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.educations.indexOf(education);

    if (index !== -1) {
      userData.userDetails.educations.splice(index, 1);
      this.dataStorageService.setUserData(userData);
    }
  }
}
