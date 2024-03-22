import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ResumePreviewComponent} from "./resume-preview/resume-preview.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResumePreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'resume-builder';
}
