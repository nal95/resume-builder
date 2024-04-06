// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {ToolsComponent} from './tools.component';
// import {User} from "../../resume-data/user.data";
// import {of} from "rxjs";
//
// describe('ToolsComponent', () => {
//   let component: ToolsComponent;
//   let fixture: ComponentFixture<ToolsComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ToolsComponent]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(ToolsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   afterEach(() => {
//     component.ngOnDestroy();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should set userData when initUserData emits', () => {
//     const userData: User = { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } as User;
//     component.initUserData = of(userData);
//
//     // Manually trigger ngOnInit
//     component.ngOnInit();
//
//     // Verify that userData is properly set
//     expect(component.userData).toEqual(userData);
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
// });
