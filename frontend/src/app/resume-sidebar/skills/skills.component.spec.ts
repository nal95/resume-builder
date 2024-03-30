import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';
import {User} from "../../resume-data/user.data";
import {of} from "rxjs";

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userData when initUserData emits', () => {
    const userData: User = { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } as User;
    component.initUserData = of(userData);

    // Manually trigger ngOnInit
    component.ngOnInit();

    // Verify that userData is properly set
    expect(component.userData).toEqual(userData);
  });

  it('should unsubscribe onDestroy', () => {
    const nextSpy = jest.spyOn(component.unsubscribe$, 'next');
    const completeSpy = jest.spyOn(component.unsubscribe$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();

    nextSpy.mockRestore();
    completeSpy.mockRestore();
  });
});
