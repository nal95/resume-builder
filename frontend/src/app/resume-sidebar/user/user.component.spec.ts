// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {UserComponent} from './user.component';
// import {of} from "rxjs";
// import {User} from "../../resume-data/user.data";
//
// describe('UserComponent', () => {
//   let component: UserComponent;
//   let fixture: ComponentFixture<UserComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [UserComponent]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(UserComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   afterEach(() => {
//     component.ngOnDestroy();
//   });
//
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should set userData when initUserData emits', () => {
//     const userData: User = { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } as User;
//     component.UserData = of(userData);
//
//     // Manually trigger ngOnInit
//     component.ngOnInit();
//
//     // Verify that userData is properly set
//     expect(component.userData).toEqual(userData);
//   });
//
//   it('should update first name', () => {
//     const firstName = 'John';
//     const newValue = 'Jane';
//     const user: User = { firstName } as User;
//     component.userData = user;
//     component.UserData = of(user);
//     fixture.detectChanges();
//
//     const emitSpy = jest.spyOn(component.userDataChanged, 'emit');
//
//     component.updateFirstName(newValue);
//
//     expect(component.userData.firstName).toEqual(newValue);
//     expect(emitSpy).toHaveBeenCalledWith({ ...user, firstName: newValue });
//
//     emitSpy.mockRestore();
//   });
//
//   it('should update last name', () => {
//     const lastName = 'Doe';
//     const newValue = 'Smith';
//     const user: User = { lastName } as User;
//     component.userData = user;
//     component.UserData = of(user);
//     fixture.detectChanges();
//
//     const emitSpy = jest.spyOn(component.userDataChanged, 'emit');
//
//     component.updateLastName(newValue);
//
//     expect(component.userData.lastName).toEqual(newValue);
//     expect(emitSpy).toHaveBeenCalledWith({ ...user, lastName: newValue });
//
//     emitSpy.mockRestore();
//   });
//
//   it('should update email', () => {
//     const email = 'john@example.com';
//     const newValue = 'jane@example.com';
//     const user: User = { email } as User;
//     component.userData = user;
//     component.UserData = of(user);
//     fixture.detectChanges();
//
//     const emitSpy = jest.spyOn(component.userDataChanged, 'emit');
//
//     component.updateEmail(newValue);
//
//     expect(component.userData.email).toEqual(newValue);
//     expect(emitSpy).toHaveBeenCalledWith({ ...user, email: newValue });
//
//     emitSpy.mockRestore();
//   });
//
//   it('should unsubscribe onDestroy', () => {
//     const nextSpy = jest.spyOn(component.unsubscribe$, 'next');
//     const completeSpy = jest.spyOn(component.unsubscribe$, 'complete');
//
//     component.ngOnDestroy();
//
//     expect(nextSpy).toHaveBeenCalled();
//     expect(completeSpy).toHaveBeenCalled();
//
//     nextSpy.mockRestore();
//     completeSpy.mockRestore();
//   });
//
// });
