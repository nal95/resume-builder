import {TestBed} from '@angular/core/testing';

import {ResumeDataService} from './resume-data.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../../resume-data/user.data";
import {GET_USER} from "../../backend/api-endpoints";

describe('ResumeDataService', () => {
  let service: ResumeDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResumeDataService]
    });
    service = TestBed.inject(ResumeDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user details', () => {
    const userId = '1';
    const mockUser: User = { id: userId } as unknown as User;

    service.getUserDetails(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(GET_USER + userId);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
