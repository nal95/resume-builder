import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {InputWithIconTextComponent} from "../../utils/input-with-icon-text/input-with-icon-text.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    InputWithIconTextComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userData$ = this.dataStorageService.userData$;

  constructor(private dataStorageService: UserDataStoreService) {
  }
}
