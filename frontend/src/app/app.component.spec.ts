// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {AppComponent} from './app.component';
// import {Observable, of} from "rxjs";
// import {User} from "./resume-data/user.data";
// import {UserDataService} from "./services/user-data/user-data.service";
//
// describe('AppComponent', () => {
//
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let resumeDataServiceStub: Partial<UserDataService>;
//
//   beforeEach(async () => {
//     // Stub ResumeDataService
//     resumeDataServiceStub = {
//       getUserData: (userId: string) => of({
//         id: userId,
//         name: 'John Doe',
//         userDetails: {
//           network: [],
//           education: [],
//           workExperience: [],
//           technicalExperience: [],
//           tools: [],
//           methodologies: [],
//           skills: [],
//           hobbiesAndInterest: [],
//           trainingsAndCertifications: []
//         }
//       } as unknown as User)
//     };
//
//     await TestBed.configureTestingModule({
//       imports: [AppComponent],
//       providers: [{provide: UserDataService, useValue: resumeDataServiceStub}]
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create the app', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should initialize initUserData as an Observable', () => {
//     expect(component.initUserData).toBeInstanceOf(Observable);
//   });
//
//   it('should initialize with sidebar shown', () => {
//     expect(component.showSideBar).toBe(true);
//   });
//
//   it('should initialize with empty actual section', () => {
//     expect(component.actualSection).toBe('');
//   });
//
//   it('should update isSmall property on window resize', () => {
//     (window as any).innerWidth = 1300;
//     window.dispatchEvent(new Event('resize'));
//     expect(component.isSmall).toBe(false); // Initial expectation
//
//     // Simulate window resize event
//     (window as any).innerWidth = 500;
//     window.dispatchEvent(new Event('resize'));
//
//     expect(component.isSmall).toBe(true); // Expectation for small window width
//   });
//
//   it('should toggle sidebar and set actual section on collectDetailsOf', () => {
//     const sectionElement = document.createElement('div');
//     sectionElement.id = 'User';
//     component.collectDetailsOf(sectionElement);
//     expect(component.showSideBar).toBe(false);
//     expect(component.actualSection).toBe('User');
//   });
//
//   it('should toggle sidebar and clear actual section on closeSection', () => {
//     component.actualSection = 'User';
//     component.closeSection();
//     expect(component.showSideBar).toBe(false);
//     expect(component.actualSection).toBe('');
//   });
//
//   it('should update initUserData on user data change', () => {
//     const userData: User = {name: 'tester'} as unknown as User;
//     component.onUserDataChanged(userData);
//     component.initUserData.subscribe(data => {
//       expect(data).toEqual(userData);
//     });
//   });
// });
