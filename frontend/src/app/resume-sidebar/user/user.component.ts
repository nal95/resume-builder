import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(public userData: UserDataStoreService) {
  }
}
