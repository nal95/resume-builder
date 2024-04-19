import {Component} from '@angular/core';
import {map} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {QuillComponent} from "../../utils/quill/quill.component";
import {InputWithIconTextComponent} from "../../utils/input-with-icon-text/input-with-icon-text.component";

@Component({
  selector: 'app-user-basics',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    QuillComponent,
    InputWithIconTextComponent
  ],
  templateUrl: './user-basics.component.html',
  styleUrl: './user-basics.component.css'
})
export class UserBasicsComponent {

  userBasicData$ = this.dataStorageService.userData$.pipe(
    map(user => user.userDetails.basic)
  );

  constructor(private dataStorageService: UserDataStoreService) {}

  onSummaryChanged(summary: string) {
    let userData = this.dataStorageService.userData;
    userData.userDetails.basic.summary = summary;

    this.dataStorageService.setUserData(userData);
  }
}
