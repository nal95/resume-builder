import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ComposedObjectListComponent} from './composed-object-list.component';

describe('ComposedObjectListComponent', () => {
  let component: ComposedObjectListComponent;
  let fixture: ComponentFixture<ComposedObjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposedObjectListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComposedObjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
