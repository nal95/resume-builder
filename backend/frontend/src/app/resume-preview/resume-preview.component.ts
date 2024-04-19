import {Component, Input} from '@angular/core';
import {
  AsyncPipe,
  JsonPipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDataStoreService} from "../services/user-data-store/user-data-store.service";
import {SimpleComponent} from "../templates/simple/simple.component";
import {SemiProComponent} from "../templates/semi-pro/semi-pro.component";
import {ResumeTemplate} from "../resume-data/template-data";

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
    FormsModule,
    SimpleComponent,
    SemiProComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.css'
})
export class ResumePreviewComponent {

  @Input() selectedTemplate!: ResumeTemplate;

  constructor(private _sanitizer: DomSanitizer,
              private dataStorageService: UserDataStoreService) {
  }

  zoomLevel: number = 1; // Initial zoom level

  zoomIn() {
    this.zoomLevel += 0.1; // Increase zoom level by 10%
  }

  zoomOut() {
    if (this.zoomLevel > 0.1) {
      this.zoomLevel -= 0.1; // Decrease zoom level by 10%, but ensure it doesn't go below 10%
    }
  }

  // TODO: look of how to handle the images
  // getImageUrl(image: string) {
  //   const newImage = 'data:image/svg+xml;base64,' + image;
  //   return this._sanitizer.bypassSecurityTrustResourceUrl(newImage);
  // }
}
