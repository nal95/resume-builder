import {Component} from '@angular/core';
import {map} from "rxjs";
import {WorkExperience} from "../../resume-data/user.data";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {QuillComponent} from "../../utils/quill/quill.component";

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
    QuillComponent
  ],
  templateUrl: './work-experiences.component.html',
  styleUrl: './work-experiences.component.css'
})
export class WorkExperiencesComponent {
  userWorkExperiences$ = this.dataStorageService.userData$.pipe(
    map(user => user.userDetails.workExperiences)
  );

  constructor(public dataStorageService: UserDataStoreService) {
  }

  addWorkExperience() {
    let userData = this.dataStorageService.userData;
    const newWorkExperience: WorkExperience = {
      company: '',
      companyCity: '',
      companyLink: '',
      occupiedPosition: '',
      startDate: '',
      endDate: '',
      duration: '',
      summary: '<ul><li>e.g. made documentation on the project</li></ul>',
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

  showLabels(length: number, length2: number) {
      return !(length > 0 && length2 > 0);
  }

  showLabel(length: number) {
    return !(length > 0);
  }
}
