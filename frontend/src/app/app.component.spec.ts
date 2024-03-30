import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ResumeDataService} from "./services/resume-data.service";
import {of} from "rxjs";
import {User} from "./resume-data/user.data";

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let resumeDataServiceStub: Partial<ResumeDataService>;

  beforeEach(async () => {
    // Stub ResumeDataService
    resumeDataServiceStub = {
      getUserDetails: (userId: string) => of({id: userId, name: 'John Doe'} as unknown as User)
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      // declarations: [AppComponent],
      providers: [{provide: ResumeDataService, useValue: resumeDataServiceStub}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sidebar shown', () => {
    expect(component.showSideBar).toBe(true);
  });

  it('should initialize with empty actual section', () => {
    expect(component.actualSection).toBe('');
  });

  it('should toggle sidebar and set actual section on collectDetailsOf', () => {
    const sectionElement = document.createElement('div');
    sectionElement.id = 'User';
    component.collectDetailsOf(sectionElement);
    expect(component.showSideBar).toBe(false);
    expect(component.actualSection).toBe('User');
  });

  it('should toggle sidebar and clear actual section on closeSection', () => {
    component.actualSection = 'User';
    component.closeSection();
    expect(component.showSideBar).toBe(false);
    expect(component.actualSection).toBe('');
  });

  it('should update initUserData on user data change', () => {
    const userData: User = { name:  'tester' } as unknown as User;
    component.onUserDataChanged(userData);
    component.initUserData.subscribe(data => {
      expect(data).toEqual(userData);
    });
  });
});
