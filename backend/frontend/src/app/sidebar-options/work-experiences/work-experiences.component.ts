import {Component} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {WorkExperience} from "../../resume-data/user-options.data.model";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {QuillComponent} from "../../utils/quill/quill.component";
import {InputWithIconTextComponent} from "../../utils/input-with-icon-text/input-with-icon-text.component";

@Component({
  selector: 'app-work-experiences',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
    NgTemplateOutlet,
    QuillComponent,
    InputWithIconTextComponent
  ],
  templateUrl: './work-experiences.component.html',
  styleUrl: './work-experiences.component.css'
})
export class WorkExperiencesComponent {
  userWorkExperiences$ = this.dataStorageService.userData$.pipe(
    map(user => user.userDetails.workExperiences)
  );

  constructor(private dataStorageService: UserDataStoreService) {}

  addWorkExperience() {
    let userData = this.dataStorageService.userData;
    const newWorkExperience: WorkExperience = {
      company: '',
      companyCity: '',
      companyLink: '',
      occupiedPosition: '',
      startDate: '',
      endDate: '',
      duration: 0,
      summary: '',//<ul><li>e.g. made documentation on the project</li></ul>
      showContent: true
    };

    userData.userDetails.workExperiences.push(newWorkExperience);
    this.dataStorageService.setUserData(userData);
  }

  toggleWorkExperience(workExperience: WorkExperience) {
    workExperience.showContent = !workExperience.showContent;
  }

  onSummaryChanged(workExperience: WorkExperience, summary: string) {
    let userData = this.dataStorageService.userData;
    userData.userDetails.workExperiences.filter(w => {
      if (w === workExperience) {
        w.summary = summary;
      }
    });

    this.dataStorageService.setUserData(userData);
  }


  deleteWorkExperience(workExperience: WorkExperience) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.workExperiences.indexOf(workExperience);

    if (index !== -1) {
      userData.userDetails.workExperiences.splice(index, 1);
      this.dataStorageService.setUserData(userData);
    }
  }


  makeDateActual(workExperience: WorkExperience) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.workExperiences.indexOf(workExperience);

    if (index !== -1 && !userData.userDetails.workExperiences[index].actual) {

      userData.userDetails.workExperiences.forEach((w, i) => {
        if (w.actual) w.actual = false;
        if (i == index) w.actual = true;
      })

      this.dataStorageService.setUserData(userData);
    }
  }
}
