import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SemiProComponent} from './semi-pro.component';

describe('SemiProComponent', () => {
  let component: SemiProComponent;
  let fixture: ComponentFixture<SemiProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemiProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemiProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
