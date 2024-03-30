import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from "../../resume-data/user.data";
import {Observable, Subject, takeUntil} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, OnDestroy{
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

  updateFirstName(value: string) {
    if (this.userData){
      this.userData.firstName = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  updateLastName(value: string) {
    if (this.userData){
      this.userData.lastName = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  updateEmail(value: string) {
    if (this.userData){
      this.userData.email = value;
      this.userDataChanged.emit(this.userData);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
