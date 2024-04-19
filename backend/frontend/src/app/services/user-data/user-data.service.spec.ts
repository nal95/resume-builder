import {TestBed} from '@angular/core/testing';

import {UserDataService} from './user-data.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../../resume-data/user-options.data.model";
import {GET_USER} from "../../backend/api-endpoints";

describe('ResumeDataService', () => {
  let service: UserDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDataService]
    });
    service = TestBed.inject(UserDataService);
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

    service.getUserData(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(GET_USER + userId);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
