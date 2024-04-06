import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDataStoreService} from "../services/user-data-store/user-data-store.service";

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    JsonPipe,
    NgOptimizedImage,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.css'
})
export class ResumePreviewComponent {

  constructor(private _sanitizer: DomSanitizer,
              public dataStorageService: UserDataStoreService) {
  }

  //TODO: work on a way to render image
  getImageUrl(image: string) {
    const newImage = 'data:image/svg+xml;base64,' + image;
    return this._sanitizer.bypassSecurityTrustResourceUrl(newImage);
  }
}
