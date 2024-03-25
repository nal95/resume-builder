import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PreviewComponent} from "./resume/preview/preview.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'resume-builder';

}
