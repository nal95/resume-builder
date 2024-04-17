import {TestBed} from '@angular/core/testing';

import {ResumeTemplateStoreService} from './resume-template-store.service';

describe('TemplateStoreService', () => {
  let service: ResumeTemplateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeTemplateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
