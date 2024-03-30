import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../resume-data/user.data";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent  implements OnInit, OnDestroy {
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

}
