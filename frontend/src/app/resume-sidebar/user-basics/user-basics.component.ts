import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../resume-data/user.data";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-basics',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './user-basics.component.html',
  styleUrl: './user-basics.component.css'
})
export class UserBasicsComponent implements OnInit, OnDestroy {
  @Input()
  initUserData!: Observable<User>;

  @Output()
  userDataChanged = new EventEmitter<User>();

  userData!: User;
  public unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    if (this.initUserData) {
      this.initUserData.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(user => {
        this.userData = user;
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateSummary(value: string) {
    if (this.userData){
      this.userData.userDetails.basic.summary = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  updateLocation(value: string) {
    if (this.userData){
      this.userData.userDetails.basic.location = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  updatePhone(value: string) {
    if (this.userData){
      this.userData.userDetails.basic.mobilePhoneNumber = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  updateExperiencesYears(value: number) {
    if (this.userData){
      this.userData.userDetails.basic.relevantExperienceYears = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  updateTitle(value: string) {
    if (this.userData){
      this.userData.userDetails.basic.title = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  updateProfession(value: string) {
    if (this.userData){
      this.userData.userDetails.basic.profession = value;
      this.userDataChanged.emit(this.userData);
    }
  }
}
