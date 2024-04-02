import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Network, User} from "../../resume-data/user.data";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-networks',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './networks.component.html',
  styleUrl: './networks.component.css'
})
export class NetworksComponent  implements OnInit, OnDestroy {
  @Input()
  initUserData!: Observable<User>;

  @Output()
  userDataChanged = new EventEmitter<User>();

  userData!: User;

  newNetwork: Network = { name: '', referenceName: '', link: '' , showContent: true};

  public unsubscribe$: Subject<void> = new Subject<void>();


  ngOnInit(): void {
    if (this.initUserData) {
      this.initUserData.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(user => {
        this.userData = user;
        this.userData.userDetails.networks.forEach( network => network.showContent = false);
        this.userDataChanged.emit(this.userData);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  addNetwork() {
    if (this.userData) {
      this.userData.userDetails.networks.push(this.newNetwork);
      this.userDataChanged.emit(this.userData);
    }
  }


  toggleContent(network: Network) {
    network.showContent = !network.showContent;
  }


  deleteNetwork(network: Network) {
    if (this.userData) {
      const index = this.userData.userDetails.networks.indexOf(network);
      if (index !== -1) {
        this.userData.userDetails.networks.splice(index, 1);
        this.userDataChanged.emit(this.userData);
      }
    }
  }
}
