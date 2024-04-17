import {Component} from '@angular/core';
import {map} from "rxjs";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {TechnicalDetail, TechnicalExperience} from "../../resume-data/user.data";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputWithIconTextComponent} from "../../utils/input-with-icon-text/input-with-icon-text.component";

@Component({
  selector: 'app-tech-experiences',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    InputWithIconTextComponent
  ],
  templateUrl: './tech-experiences.component.html',
  styleUrl: './tech-experiences.component.css'
})
export class TechExperiencesComponent {

  userTechExperiences$ = this.dataStorageService.userData$.pipe(
    map(user => user.userDetails.technicalExperiences)
  );

  constructor(public dataStorageService: UserDataStoreService) {
  }

  toggleTechExperience(techExperience: TechnicalExperience) {
    techExperience.showContent = !techExperience.showContent;
  }

  addTechExperience() {
    let userData = this.dataStorageService.userData;
    const techExperience: TechnicalExperience = {
      topic: '',
      showContent: true,
      technicalDetails: [{
        name: '',
        level: 1
      }]
    };

    userData.userDetails.technicalExperiences.push(techExperience);
    this.dataStorageService.setUserData(userData);
  }

  addTechDetails(techExperience: TechnicalExperience) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.technicalExperiences.indexOf(techExperience);
    const techDetail: TechnicalDetail = {
      name: '',
      level: 1
    };

    if (index !== -1) {
      userData.userDetails.technicalExperiences[index].technicalDetails.push(techDetail);
      this.dataStorageService.setUserData(userData);
    }
  }

  deleteTechExperiences(techExperience: TechnicalExperience) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.technicalExperiences.indexOf(techExperience);

    if (index !== -1) {
      userData.userDetails.technicalExperiences.splice(index, 1);
      this.dataStorageService.setUserData(userData);
    }
  }

  removeTechDetails(techExperience: TechnicalExperience, technicalDetail: TechnicalDetail) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.technicalExperiences.indexOf(techExperience);

    techExperience.technicalDetails = techExperience.technicalDetails
      .filter(techDetail => techDetail !== technicalDetail);

    if (index !== -1){
      userData.userDetails.technicalExperiences[index] = techExperience;
      this.dataStorageService.setUserData(userData);
    }
  }
}
