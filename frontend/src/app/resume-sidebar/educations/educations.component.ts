import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Education, User} from "../../resume-data/user.data";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
export class EducationsComponent implements OnInit, OnDestroy {
  @Input()
  initUserData!: Observable<User>;

  @Output()
  userDataChanged = new EventEmitter<User>();

  userData!: User;

  newEducation: Education = {
    school: '',
    field: '',
    degree: '',
    startDate: '',
    endDate: '',
    duration: 0,
    summary: '',
    showContent: true
  };

  public unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    if (this.initUserData) {
      this.initUserData.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(user => {
        this.userData = user;
        this.userData.userDetails.educations.forEach(education => {
          education.startDate = education.startDate.trim().substring(0, 7);
          education.endDate = education.endDate.trim().substring(0, 7);
          education.showContent = false
        });
        this.userDataChanged.emit(this.userData);
      });
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleEducation(education: Education) {
    education.showContent = !education.showContent;
  }

  deleteEducation(education: Education) {
    if (this.userData) {
      const index = this.userData.userDetails.educations.indexOf(education);
      if (index !== -1) {
        this.userData.userDetails.educations.splice(index, 1);
        this.userDataChanged.emit(this.userData);
      }
    }
  }

  addEducation() {
    if (this.userData) {
      this.userData.userDetails.educations.push(this.newEducation);
      this.userDataChanged.emit(this.userData);
    }
  }
}
