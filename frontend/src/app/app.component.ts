import {Component, HostListener, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {UserComponent} from "./resume-sidebar/user/user.component";
import {UserBasicsComponent} from "./resume-sidebar/user-basics/user-basics.component";
import {NetworksComponent} from "./resume-sidebar/networks/networks.component";
import {EducationsComponent} from "./resume-sidebar/educations/educations.component";
import {WorkExperiencesComponent} from "./resume-sidebar/work-experiences/work-experiences.component";
import {TechExperiencesComponent} from "./resume-sidebar/tech-experiences/tech-experiences.component";
import {SkillsComponent} from "./resume-sidebar/skills/skills.component";
import {ToolsComponent} from "./resume-sidebar/tools/tools.component";
import {MethodologiesComponent} from "./resume-sidebar/methodologies/methodologies.component";
import {HobbiesComponent} from "./resume-sidebar/hobbies/hobbies.component";
import {TrainingsComponent} from "./resume-sidebar/trainings/trainings.component";
import {LanguagesComponent} from "./resume-sidebar/languages/languages.component";
import {User} from "./resume-data/user.data";
import {Observable} from "rxjs";
import {ResumePreviewComponent} from "./resume-preview/resume-preview.component";
import {ResumeDataService} from "./services/resume-data/resume-data.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, UserComponent, UserBasicsComponent,
    NetworksComponent, EducationsComponent, WorkExperiencesComponent,
    TechExperiencesComponent, SkillsComponent, ToolsComponent,
    MethodologiesComponent, HobbiesComponent, TrainingsComponent,
    LanguagesComponent, AsyncPipe, ResumePreviewComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'resume-builder';
  showSideBar: boolean = true
  actualSection: string = ""
  initUserData: Observable<User> = this.resumeDataService.getUserDetails('1');
  isSmall: boolean = false;

  constructor(private resumeDataService: ResumeDataService) {

    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIfMobile(); // Call the function whenever window is resized
  }

  ngOnInit(): void {
  }

  collectDetailsOf(sectionElement: HTMLElement) {
    this.showSideBar = !this.showSideBar;
    this.actualSection = sectionElement.id
  }

  closeSection() {
    this.showSideBar = !this.showSideBar;
    this.actualSection = "";
  }

  checkIfMobile() {
    // Check if viewport width is less than or equal to 768px (adjust as needed)
    this.isSmall = window.innerWidth <= 1280;
  }

  onUserDataChanged(userData: User) {
    this.initUserData = new Observable<User>(observer => {
      observer.next(userData);
      observer.complete();
    });
  }

}
