import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {BehaviorSubject, catchError, of, retry, Subject, takeUntil} from "rxjs";
import {ResumePreviewComponent} from "./resume-preview/resume-preview.component";
import {UserDataService} from "./services/user-data/user-data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserDataStoreService} from "./services/user-data-store/user-data-store.service";
import {User} from "./resume-data/user.data";
import {NavbarComponent} from "./navbar/navbar.component";
import {ResumeTemplate} from "./resume-data/template-data";
import {UserComponent} from "./sidebar-options/user/user.component";
import {UserBasicsComponent} from "./sidebar-options/user-basics/user-basics.component";
import {NetworksComponent} from "./sidebar-options/networks/networks.component";
import {EducationsComponent} from "./sidebar-options/educations/educations.component";
import {WorkExperiencesComponent} from "./sidebar-options/work-experiences/work-experiences.component";
import {TechExperiencesComponent} from "./sidebar-options/tech-experiences/tech-experiences.component";
import {SkillsComponent} from "./sidebar-options/skills/skills.component";
import {ToolsComponent} from "./sidebar-options/tools/tools.component";
import {MethodologiesComponent} from "./sidebar-options/methodologies/methodologies.component";
import {HobbiesComponent} from "./sidebar-options/hobbies/hobbies.component";
import {CertificationsComponent} from "./sidebar-options/certifications/certifications.component";
import {TrainingsComponent} from "./sidebar-options/trainings/trainings.component";
import {LanguagesComponent} from "./sidebar-options/languages/languages.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, UserComponent, UserBasicsComponent,
    NetworksComponent, EducationsComponent, WorkExperiencesComponent,
    TechExperiencesComponent, SkillsComponent, ToolsComponent,
    MethodologiesComponent, HobbiesComponent, TrainingsComponent,
    LanguagesComponent, AsyncPipe, ResumePreviewComponent, NgClass, JsonPipe, CertificationsComponent, NavbarComponent, NgForOf, NgOptimizedImage, UserComponent, UserBasicsComponent, NetworksComponent, EducationsComponent, WorkExperiencesComponent, TechExperiencesComponent, SkillsComponent, ToolsComponent, MethodologiesComponent, HobbiesComponent, CertificationsComponent, TrainingsComponent, LanguagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  showSideBar: boolean = true
  actualSection: string = ""
  isSmall: boolean = false;
  isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  userDataIsLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private resumeDataService: UserDataService,
              public dataStorageService: UserDataStoreService,
              private cdr: ChangeDetectorRef
              ) {
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIfMobile(); // Call the function whenever window is resized
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  resumeTemplates: ResumeTemplate[] = [
    {
      name: 'Simple',
      author: '@nal95',
      description: 'Simple Resume Template',
      image: 'assets/images/simple.jpeg',
      version: '1.0.0'
    },
    {
      name: 'Semi Pro',
      author: '@nal95',
      description: 'Semi Pro Resume Template',
      image: 'assets/images/semi-pro.jpeg',
      version: '1.0.0'
    }
  ];


  selectedTemplate: ResumeTemplate = this.resumeTemplates[0];

  currentIndex: number = 0;

  selectTemplate(): void {
    this.cdr.detectChanges();
    this.closeModal();
  }

  nextTemplate(): void {
    this.currentIndex = (this.currentIndex + 1) % this.resumeTemplates.length;
    this.selectedTemplate = this.resumeTemplates[this.currentIndex];
  }

  previousTemplate(): void {
    this.currentIndex = (this.currentIndex - 1 + this.resumeTemplates.length) % this.resumeTemplates.length;
    this.selectedTemplate = this.resumeTemplates[this.currentIndex];
  }

  loadUserData() {
    this.resumeDataService.getUserData('1')
      .pipe(
        takeUntil(this.unsubscribe$),
        retry(3),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching user data:', error);
          return of('An error occurred while fetching user data.');
        })
      )
      .subscribe((data) => {
        if (typeof data != 'string') {
          this.dataStorageService.setUserData(this.someConversionAndInitialization(data));
          this.userDataIsLoaded$.next(true);
        }
      });
  }

  collectDetailsOf(sectionElement: HTMLElement) {
    if (this.userDataIsLoaded$.getValue()) {
      this.showSideBar = !this.showSideBar;
      this.actualSection = sectionElement.id
    }
  }

  closeSection() {
    this.showSideBar = !this.showSideBar;
    this.actualSection = "";
  }

  checkIfMobile() {
    // Check if viewport width is less than or equal to 768px (adjust as needed)
    this.isSmall = window.innerWidth <= 1200;
  }

  someConversionAndInitialization(data: User) {
    data.userDetails.networks.forEach(network => network.showContent = false);
    data.userDetails.technicalExperiences.forEach(techExperience =>
      techExperience.showContent = false);

    data.userDetails.educations.forEach(education => {
      education.showContent = false;
      education.startDate = this.formattedDateString(education.startDate);
      education.endDate = this.formattedDateString(education.endDate);
    });

    data.userDetails.workExperiences.forEach(workExperience => {
      workExperience.showContent = false
      workExperience.startDate = this.formattedDateString(workExperience.startDate);
      workExperience.endDate = this.formattedDateString(workExperience.endDate);
    });

    data.userDetails.certifications.forEach(certification =>
      certification.validity = this.formattedDateString(certification.validity));

    return data;
  }

  formattedDateString(dateString: string) {
    return dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$1-$2');
  }

  closeModal() {
    this.isModalOpen$.next(!this.isModalOpen$.value);
  }
}
