import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../resume-data/user.data";
import {AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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

  @Input()
  initUserData!: Observable<User>;

  constructor(private _sanitizer: DomSanitizer) {
  }

  getImageUrl(image: string) {
    const newImage =  'data:image/svg+xml;base64,' + image;
    return this._sanitizer.bypassSecurityTrustResourceUrl(newImage);
  }
}
