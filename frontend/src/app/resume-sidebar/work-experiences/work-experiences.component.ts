import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {User, WorkExperience} from "../../resume-data/user.data";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-work-experiences',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './work-experiences.component.html',
  styleUrl: './work-experiences.component.css'
})
export class WorkExperiencesComponent  implements OnInit, OnDestroy {
  @Input()
  initUserData!: Observable<User>;

  @Output()
  userDataChanged = new EventEmitter<User>();

  userData!: User;

  newWorkExperience: WorkExperience = {
    company: '',
    companyCity: '',
    companyLink: '',
    occupiedPosition: '',
    startDate: '',
    endDate: '',
    duration: '',
    summary: [],
    showContent: true
  };

  public unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    if (this.initUserData) {
      this.initUserData.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(user => {
        this.userData = user;
        this.userData.userDetails.workExperiences.forEach(workExperience => {
          workExperience.startDate = workExperience.startDate.trim().substring(0,7);
          workExperience.endDate = workExperience.endDate.trim().substring(0,7);
          workExperience.showContent = false
        });
        this.userDataChanged.emit(this.userData);
        console.log(this.userData.userDetails.workExperiences);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteWorkExperience(workExperience: WorkExperience) {
    if (this.userData) {
      const index = this.userData.userDetails.workExperiences.indexOf(workExperience);
      if (index !== -1) {
        this.userData.userDetails.workExperiences.splice(index, 1);
        this.userDataChanged.emit(this.userData);
      }
    }
  }

  toggleWorkExperience(workExperience: WorkExperience) {
    workExperience.showContent = !workExperience.showContent;
  }

  addWorkExperience() {
    if (this.userData) {
      this.userData.userDetails.workExperiences.push(this.newWorkExperience);
      this.userDataChanged.emit(this.userData);
    }
  }

  addWorkExperienceSummary(workExperience: WorkExperience) {
    workExperience.summary.push('');
  }

  deleteWorkExperienceSummary(workExperience: WorkExperience, index: number) {
    workExperience.summary.splice(index, 1);
  }

  // updateWS(workExperience: WorkExperience, summary: string, value: Event) {
  //   if (this.userData){
  //     const index = this.userData.userDetails.workExperiences.indexOf(workExperience);
  //     const summaryIndex = this.userData.userDetails.workExperiences[index].summary.indexOf(summary);
  //     if (index !== -1 && summaryIndex !== -1) {
  //       this.userData.userDetails.workExperiences[index].summary[summaryIndex] = (value.target as HTMLInputElement).value;
  //       this.userDataChanged.emit(this.userData);
  //     }
  //   }
  // }
  updateWS(summary: String[], index: number, $event: Event) {
    if (this.userData){
      let workExperience = this.userData.userDetails.workExperiences.find( w => w.summary === summary);
      if (workExperience) {
        const _index = this.userData.userDetails.workExperiences.indexOf(workExperience);
        this.userData.userDetails.workExperiences[_index].summary[index] = ($event.target as HTMLInputElement).value;
        this.userDataChanged.emit(this.userData);

        // this.userData.userDetails.workExperiences[index].summary = value;
        // this.userDataChanged.emit(this.userData);
      }
    }
  }
}
